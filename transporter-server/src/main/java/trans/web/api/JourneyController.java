package trans.web.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import trans.Journey;
import trans.JourneyDriver;

import trans.data.*;

import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/journey", produces = "application/json")
@CrossOrigin(origins = "*")
public class JourneyController {
    private JourneyRepository jouRepo;
    private VehicleRepository vehicleRepository;
    private RouteRepository routeRepository;
    private JourneyDriverRepository journeyDriverRepository;
    private DriverRepository driverRepository;

    @Autowired
    public JourneyController(JourneyRepository jouRepo, VehicleRepository vehicleRepository,
                             RouteRepository routeRepository, JourneyDriverRepository journeyDriverRepository,
                             DriverRepository driverRepository) {
        this.jouRepo = jouRepo;
        this.vehicleRepository = vehicleRepository;
        this.routeRepository = routeRepository;
        this.journeyDriverRepository = journeyDriverRepository;
        this.driverRepository = driverRepository;
    }

    @GetMapping("/list")
    public Iterable<Journey> listRoute() {
        return jouRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Journey> journeyById(@PathVariable("id") Long id) {
        Optional<Journey> optJourney = jouRepo.findById(id);
        if (optJourney.isPresent()) {
            return ResponseEntity.ok(optJourney.get());
        }
        return null;
    }

    @GetMapping("/search/{firstPoint}")
    public List<Journey> searchByFirstPoint(@PathVariable("firstPoint") String firstPoint) {
        List<Journey> journeys = new ArrayList<>();
        jouRepo.findAll().forEach(i -> journeys.add(i));
        return filterByKeyFirstPoint(journeys, firstPoint);
    }

    @PostMapping(consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, String> postJourney(@Valid @RequestBody LinkedHashMap objects) {
        HashMap<String, String> response = new HashMap<>();
        Journey journeys = new Journey();
        JourneyDriver journeyDriver = new JourneyDriver();
        JourneyDriver journeyAssistant = new JourneyDriver();

        try {
            if (objects.get("fare").toString().trim() == "") {
                response.put("mess", "false");
                response.put("fare", "Không được bỏ trống");
            }
            if (objects.get("vehicle").toString().trim().equals("")) {
                response.put("mess", "false");
                response.put("vehicle", "Chọn 1 xe");
            }
            if (objects.get("guest_quanity").toString().trim().equals("")) {
                response.put("mess", "false");
                response.put("guest_quanity", "Không được bỏ trống");
            }
            if (!objects.get("vehicle").toString().trim().equals("") && !objects.get("guest_quanity").toString().trim().equals("")) {
                if (Integer.parseInt(objects.get("guest_quanity").toString()) > (vehicleRepository.findById(objects.get("vehicle").toString()).get().getSeat() - 2)) {
                    response.put("mess", "false");
                    response.put("guest_quanity", "Nhập số khách nhỏ hơn hoặc bằng số ghế trừ 2");
                }
            }
            if (objects.get("route").toString().trim().equals("")) {
                response.put("mess", "false");
                response.put("route", "Chọn 1 tuyến đường");
            }
            if (objects.get("driver").toString().trim().equals("")) {
                response.put("mess", "false");
                response.put("driver", "Chọn 1 tài xế");
            }
            if (objects.get("assistant").toString().trim().equals("")) {
                response.put("mess", "false");
                response.put("assistant", "Chọn 1 phụ xe");
            } else if (Integer.parseInt(objects.get("guest_quanity").toString()) <= (vehicleRepository.findById(objects.get("vehicle").toString()).get().getSeat() - 2)) {
                journeys.setGuest_quanity(Integer.parseInt(objects.get("guest_quanity").toString()));
                journeys.setFare(Double.parseDouble(objects.get("fare").toString()));

                journeys.setVehicle(vehicleRepository.findById(objects.get("vehicle").toString()).get());
                journeys.setRoute(routeRepository.findById(Long.parseLong(objects.get("route").toString())).get());

                journeyDriver.setDrivers(driverRepository.findById(objects.get("driver").toString()).get());
                journeyDriver.setRole("TX");
                journeyDriver.setJourneys(journeys);

                journeyAssistant.setDrivers(driverRepository.findById(objects.get("assistant").toString()).get());
                journeyAssistant.setRole("PX");
                journeyAssistant.setJourneys(journeys);

                jouRepo.save(journeys);
                journeyDriverRepository.save(journeyDriver);
                journeyDriverRepository.save(journeyAssistant);
                response.put("mess", "success");
            }
        } catch (Exception e) {
            return response;
        }
        return response;
    }

    @PutMapping("/{id}")
    public Map<String, Object> updateJourney(@PathVariable("id") Long id, @Valid @RequestBody LinkedHashMap objects) {
        HashMap<String, Object> response = new HashMap<>();
        Journey journeys = jouRepo.getById(id);
        JourneyDriver journeyDriver = filterBy(journeyDriverRepository.findAll(), id).get(0);
        JourneyDriver journeyAssistant = filterBy(journeyDriverRepository.findAll(), id).get(1);
        try {
            if (objects.get("fare").toString().trim() == "") {
                response.put("mess", "false");
                response.put("fare", "Không được bỏ trống");
            }
            if (objects.get("vehicle").toString().trim().equals("")) {
                response.put("mess", "false");
                response.put("vehicle", "Chọn 1 xe");
            }
            if (objects.get("guest_quanity").toString().trim().equals("")) {
                response.put("mess", "false");
                response.put("guest_quanity", "Không được bỏ trống");
            }
            if (!objects.get("vehicle").toString().trim().equals("") && !objects.get("guest_quanity").toString().trim().equals("")) {
                if (Integer.parseInt(objects.get("guest_quanity").toString()) > (vehicleRepository.findById(objects.get("vehicle").toString()).get().getSeat() - 2)) {
                    response.put("mess", "false");
                    response.put("guest_quanity", "Nhập số khách nhỏ hơn hoặc bằng số ghế trừ 2");
                }
            }
            if (objects.get("route").toString().trim().equals("")) {
                response.put("mess", "false");
                response.put("route", "Chọn 1 tuyến đường");
            }
            if (objects.get("driver").toString().trim().equals("")) {
                response.put("mess", "false");
                response.put("driver", "Chọn 1 tài xế");
            }
            if (objects.get("assistant").toString().trim().equals("")) {
                response.put("mess", "false");
                response.put("assistant", "Chọn 1 phụ xe");
            } else if (Integer.parseInt(objects.get("guest_quanity").toString()) <= (vehicleRepository.findById(objects.get("vehicle").toString()).get().getSeat() - 2)) {
                journeys.setGuest_quanity(Integer.parseInt(objects.get("guest_quanity").toString()));
                journeys.setFare(Double.parseDouble(objects.get("fare").toString()));
                journeys.setVehicle(vehicleRepository.findById(objects.get("vehicle").toString()).get());
                journeys.setRoute(routeRepository.findById(Long.parseLong(objects.get("route").toString())).get());

                journeyDriver.setDrivers(driverRepository.findById(objects.get("driver").toString()).get());
                journeyDriver.setRole("TX");
                journeyDriver.setJourneys(journeys);

                journeyAssistant.setDrivers(driverRepository.findById(objects.get("assistant").toString()).get());
                journeyAssistant.setRole("PX");
                journeyAssistant.setJourneys(journeys);

                jouRepo.save(journeys);
                journeyDriverRepository.save(journeyDriver);
                journeyDriverRepository.save(journeyAssistant);
                response.put("mess", "success");
            }
        } catch (Exception e) {
            return response;
        }
        return response;
    }

    @DeleteMapping("{id}")
    public void deleteJourney(@PathVariable("id") Long id) {
        jouRepo.deleteById(id);
    }

    @GetMapping(value = "/page/_pageNo={pageNo}&_limit={pageSize}")
    public List<Journey> findPaginated(@PathVariable("pageNo") int pageNo, @PathVariable("pageSize") int pageSize) {
        Sort sort = "asc".equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by("id").ascending() :
                Sort.by("id").descending();
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        return jouRepo.findAll(pageable).getContent();
    }

    private List<Journey> filterByKeyFirstPoint(
            List<Journey> routes, String key) {
        return routes
                .stream()
                .filter(x -> x.getRoute().getFirst_point().toLowerCase().contains(key.toLowerCase()))
                .collect(Collectors.toList());
    }

    private List<JourneyDriver> filterBy(
            List<JourneyDriver> journeyDrivers, Long id) {
        return journeyDrivers
                .stream()
                .filter(x -> x.getJourneys().getId().equals(id))
                .collect(Collectors.toList());
    }
}
