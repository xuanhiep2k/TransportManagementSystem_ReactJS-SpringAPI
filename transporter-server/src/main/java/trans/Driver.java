package trans;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AccessLevel;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Data
@Entity
@NoArgsConstructor(access = AccessLevel.PUBLIC, force = true)
public class Driver {
    @Id
    @Column(name = "id_card")
    @Pattern(regexp = "^[0-9]{9}|[0-9]{12}$", message = "Nhập số CMND 9 số hoặc 12 số")
    private String idCard;

    @NotNull
    @Size(min = 5, message = "Phải nhập tên lớn hơn 5 kí tự")
    private String name;

    @NotNull
    @Pattern(regexp = "^[0-9]{12}$", message = "Nhập 12 số trên giấy phép lái xe")
    private String license;

    @NotBlank(message = "Chọn 1 loại GPLX")
    private String type;

    @NotBlank(message = "Địa chỉ không được bỏ trống")
    private String address;

    @Pattern(regexp = "^(0[1-9]|1[0-9]|2[0-9]|3[0-1])([\\/])(0[1-9]|1[0-2])([\\/])(19[0-9][0-9]|2[0-9][0-9][0-9])$",
            message = "Nhập đúng định dạng DD/MM/YY")
    private String birth;

    @NotNull
    @Min(value = 1, message = "Nhập số năm thâm niên lớn hơn hoặc bằng 1")
    private int seniority;

}
