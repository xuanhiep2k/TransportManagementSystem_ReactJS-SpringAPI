package trans.web.api;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import trans.JourneyDriver;
import trans.data.JourneyDriverRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping(path = "/journeyDriver", produces = "application/json")
@CrossOrigin(origins = "*")
public class JourneyDriverController {
    private JourneyDriverRepository journeyDriverRepository;

    @Autowired
    public JourneyDriverController(JourneyDriverRepository journeyDriverRepository) {
        this.journeyDriverRepository = journeyDriverRepository;
    }

    @GetMapping("/list")
    public Iterable<JourneyDriver> liJourneyDrivers() {
        return journeyDriverRepository.findAll();
    }

    @GetMapping("/{id}")
    public Iterable<JourneyDriver> journeyById(@PathVariable("id") Long id) {
        Iterable<JourneyDriver> journeyDriver = filterBy(journeyDriverRepository.findAll(), id);
        return journeyDriver;
    }

    private List<JourneyDriver> filterBy(
            List<JourneyDriver> journeyDrivers, Long id) {
        return journeyDrivers
                .stream()
                .filter(x -> x.getJourneys().getId().equals(id))
                .collect(Collectors.toList());
    }
}
