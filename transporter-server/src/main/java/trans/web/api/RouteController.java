package trans.web.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trans.Route;
import trans.data.RouteRepository;

import javax.validation.Valid;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/route", produces = "application/json")
@CrossOrigin(origins = "*")
public class RouteController {
    private RouteRepository routeRepo;

    @Autowired
    public RouteController(RouteRepository routeRepo) {
        this.routeRepo = routeRepo;
    }

    @GetMapping("/list")
    public Iterable<Route> listRoute() {
        return routeRepo.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Route> routeById(@PathVariable("id") Long id) {
        Optional<Route> optRoute = routeRepo.findById(id);
        if (optRoute.isPresent()) {
            return ResponseEntity.ok(optRoute.get());
        }
        return null;
    }

    @GetMapping("/search/{firstPoint}")
    public List<Route> searchByFirstPoint(@PathVariable("firstPoint") String firstPoint) {
        List<Route> routes = new ArrayList<>();
        routeRepo.findAll().forEach(i -> routes.add(i));
        return filterByKeyFirstPoint(routes, firstPoint);
    }

    @PostMapping(consumes = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Map<String, Object> postRoute(@Valid @RequestBody Route route) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            routeRepo.save(route);
            return response;
        } catch (Exception e) {
            return response;
        }
    }

    @PutMapping("/{id}")
    public Map<String, Object> updateRoute(@PathVariable("id") Long id, @Valid @RequestBody Route route) {
        HashMap<String, Object> response = new HashMap<>();
        try {
            if (!route.getId().equals(id)) {
                throw new IllegalStateException("Error");
            } else {
                routeRepo.save(route);
                return response;
            }
        } catch (Exception e) {
            return response;
        }
    }

    @DeleteMapping("{id}")
    public void deleteRoute(@PathVariable("id") Long id) {
        routeRepo.deleteById(id);
    }

    @GetMapping(value = "/page/_pageNo={pageNo}&_limit={pageSize}")
    public List<Route> findPaginated(@PathVariable("pageNo") int pageNo, @PathVariable("pageSize") int pageSize) {
        Sort sort = "asc".equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by("id").ascending() :
                Sort.by("id").descending();
        Pageable pageable = PageRequest.of(pageNo - 1, pageSize, sort);
        return routeRepo.findAll(pageable).getContent();
    }

    private List<Route> filterByKeyFirstPoint(
            List<Route> routes, String key) {
        return routes
                .stream()
                .filter(x -> x.getFirst_point().toLowerCase().contains(key.toLowerCase()))
                .collect(Collectors.toList());
    }
}
