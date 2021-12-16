package trans.web.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trans.Vehicle;
import trans.data.VehicleRepository;

import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/vehicle", produces = "application/json")
@CrossOrigin(origins = "*")

public class VehicleController {
    private VehicleRepository veRepo;

    @Autowired
    public VehicleController(VehicleRepository veRepo) {
        this.veRepo = veRepo;
    }

    @GetMapping("/list")
    public Iterable<Vehicle> listVehicle() {
        return veRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> vehicleById(@PathVariable("id") String id) {
        Optional<Vehicle> optVe = veRepo.findById(id);
        if (optVe.isPresent()) {
            return ResponseEntity.ok(optVe.get());
        }
        return null;
    }

    @GetMapping("/search/{id}")
    public List<Vehicle> searchByKey(@PathVariable("id") String key) {
        List<Vehicle> vehicles = new ArrayList<>();
        veRepo.findAll().forEach(i -> vehicles.add(i));
        return filterByKey(vehicles, key);
    }

    @PostMapping(consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> postVehicle(@Valid @RequestBody Vehicle vehicle) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            Optional<Vehicle> validVehicle = veRepo.findById(vehicle.getLicensePlate());
            if (validVehicle.isPresent()) {
                response.put("defaultMessage", "Biển số " + vehicle.getLicensePlate() + " đã tồn tại ");
                response.put("field", false);
                return response;
            } else {
                veRepo.save(vehicle);
                return response;
            }
        } catch (Exception e) {
            return response;
        }
    }

    @PutMapping("/{id}")
    public Map<String, Object> updateVehicle(@PathVariable("id") String id, @Valid @RequestBody Vehicle vehicle) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            if (!vehicle.getLicensePlate().equals(id)) {
                throw new IllegalStateException("Error");
            } else {
                veRepo.save(vehicle);
                return response;
            }
        } catch (Exception e) {
            return response;
        }
    }

    @DeleteMapping("{id}")
    public void deleteVehicle(@PathVariable("id") String id) {
        veRepo.deleteById(id);
    }

    @GetMapping(value = "/page/_pageNo={pageNo}&_limit={pageSize}")
    public List<Vehicle> findPaginated(@PathVariable("pageNo") int pageNo, @PathVariable("pageSize") int pageSize) {
        Sort sort = "asc".equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by("licensePlate").ascending() :
                Sort.by("licensePlate").descending();
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        return veRepo.findAll(pageable).getContent();
    }

    private List<Vehicle> filterByKey(
            List<Vehicle> vehicles, String key) {
        return vehicles
                .stream()
                .filter(x -> x.getLicensePlate().toLowerCase().contains(key.toLowerCase()))
                .collect(Collectors.toList());
    }
}
