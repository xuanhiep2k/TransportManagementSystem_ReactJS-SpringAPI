package trans.data;

import org.springframework.data.jpa.repository.JpaRepository;
import trans.JourneyDriver;

import java.util.Optional;

public interface JourneyDriverRepository
        extends JpaRepository<JourneyDriver, Long> {

}
