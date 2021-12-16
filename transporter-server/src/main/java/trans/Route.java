package trans;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Data
@Entity
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotBlank(message = "Vui lòng nhập điểm đầu")
    private String first_point;

    @NotBlank(message = "Vui lòng nhập điểm cuối")
    private String end_point;

    @DecimalMin(value = "0.00001", message = "Nhập độ dài quãng đường lớn hơn 0")
    @NotNull(message = "Vui lòng nhập độ dài quãng đường")
    private Float length;

    @Min(value = 1, message = "Chọn độ phức tạp")
    private int complexity;

}
