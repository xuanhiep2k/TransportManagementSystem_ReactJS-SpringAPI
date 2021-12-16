package trans.data;

import org.springframework.data.jpa.repository.JpaRepository;
import trans.Route;

public interface RouteRepository
        extends JpaRepository<Route, Long> {
}
