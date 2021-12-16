package trans.data;

import org.springframework.data.jpa.repository.JpaRepository;
import trans.Driver;

public interface DriverRepository
        extends JpaRepository<Driver, String> {
}
