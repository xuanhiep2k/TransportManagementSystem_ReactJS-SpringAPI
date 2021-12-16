package trans.data;

import org.springframework.data.jpa.repository.JpaRepository;
import trans.Vehicle;

public interface VehicleRepository
        extends JpaRepository<Vehicle, String> {
}
