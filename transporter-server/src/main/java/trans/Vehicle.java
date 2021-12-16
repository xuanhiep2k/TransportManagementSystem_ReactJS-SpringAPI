package trans;

import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.*;

@Data
@Entity

public class Vehicle {
    @Id
    @Pattern(regexp = "^[0-9]{2}[A-Za-z]-[0-9]{4,5}$", message = "Nhập đúng định dạng, ví dụ: 17B-73684")
    @Column(name = "license_plate")
    private String licensePlate;

    @NotBlank(message = "Vui lòng nhập màu sắc")
    private String colour;

    @NotBlank(message = "Vui lòng nhập nhà sản xuất")
    private String manufacturer;

    @NotBlank(message = "Vui lòng nhập năm sản xuất")
    private String manufacture_year;

    @NotBlank(message = "Vui lòng nhập model")
    private String model;

    @NotNull
    @Min(value = 3, message = "Nhập số ghế lớn hơn hoặc bằng 3")
    private int seat;

    @NotNull
    @Min(value = 1, message = "Nhập số năm sử dụng lớn hơn hoặc bằng 1")
    private int year_of_use;

    @Pattern(regexp = "^(0[1-9]|1[0-9]|2[0-9]|3[0-1])([\\/])(0[1-9]|1[0-2])([\\/])(19[0-9][0-9]|2[0-9][0-9][0-9])$",
            message = "Nhập đúng định dạng DD/MM/YY")
    private String maintenance_day;

}
