package trans.web.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trans.Driver;
import trans.Vehicle;
import trans.data.DriverRepository;
import trans.data.VehicleRepository;

import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/driver", produces = "application/json")
@CrossOrigin(origins = "*")
public class DriverController {
    private DriverRepository driverRepo;

    @Autowired
    public DriverController(DriverRepository driverRepo) {
        this.driverRepo = driverRepo;
    }

    @GetMapping("/list")
    public Iterable<Driver> listDriver() {
        return driverRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Driver> driverById(@PathVariable("id") String id) {
        Optional<Driver> optDriver = driverRepo.findById(id);
        if (optDriver.isPresent()) {
            return ResponseEntity.ok(optDriver.get());
        }
        return null;
    }

    @GetMapping("/search/{id}")
    public List<Driver> searchByKey(@PathVariable("id") String key) {
        List<Driver> drivers = new ArrayList<>();
        driverRepo.findAll().forEach(i -> drivers.add(i));
        return filterByKey(drivers, key);
    }

    @PostMapping(consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> postDriver(@Valid @RequestBody Driver driver) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            Optional<Driver> validDriver = driverRepo.findById(driver.getIdCard());
            if (validDriver.isPresent()) {
                response.put("defaultMessage", "Số CMND " + driver.getIdCard() + " đã tồn tại ");
                response.put("field", false);
                return response;
            } else {
                driverRepo.save(driver);
                return response;
            }
        } catch (Exception e) {
            return response;
        }
    }

    @PutMapping("/{id}")
    public Map<String, Object> updateDriver(@PathVariable("id") String id, @Valid @RequestBody Driver driver) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            if (!driver.getIdCard().equals(id)) {
                throw new IllegalStateException("Error");
            } else {
                driverRepo.save(driver);
                return response;
            }
        } catch (Exception e) {
            return response;
        }
    }

    @DeleteMapping("{id}")
    public void deleteDriver(@PathVariable("id") String id) {
        driverRepo.deleteById(id);
    }

    @GetMapping(value = "/page/_pageNo={pageNo}&_limit={pageSize}")
    public List<Driver> findPaginated(@PathVariable("pageNo") int pageNo, @PathVariable("pageSize") int pageSize) {
        Sort sort = "asc".equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by("idCard").ascending() :
                Sort.by("idCard").descending();
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        return driverRepo.findAll(pageable).getContent();
    }

    private List<Driver> filterByKey(
            List<Driver> drivers, String key) {
        return drivers
                .stream()
                .filter(x -> x.getIdCard().toLowerCase().contains(key.toLowerCase()))
                .collect(Collectors.toList());
    }
}
