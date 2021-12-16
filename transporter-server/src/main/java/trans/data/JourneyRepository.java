package trans.data;

import org.springframework.data.jpa.repository.JpaRepository;
import trans.Journey;

public interface JourneyRepository
        extends JpaRepository<Journey, Long> {
}
