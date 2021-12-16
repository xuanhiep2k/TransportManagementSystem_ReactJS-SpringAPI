package trans;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Data
@Entity
@NoArgsConstructor(access = AccessLevel.PUBLIC, force = true)
@Table(name = "journey_drivers")
public class JourneyDriver {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "journeys_id", nullable = false)
    private Journey journeys;

    @JsonManagedReference
    @ManyToOne
    @JoinColumn(name = "drivers_id_card", nullable = false)
    private Driver drivers;

    @NotNull
    private String role;

}
