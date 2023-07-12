function NhanVien(taiKhoan, hoTen, email, matKhau, ngayLam, luongCoBan, chucVu, gioLam) {
    this.taiKhoan = taiKhoan;
    this.hoTen = hoTen;
    this.email = email;
    this.matKhau = matKhau;
    this.ngayLam = ngayLam;
    this.luongCoBan = luongCoBan;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
    this.tongLuong = 0;
    this.xepLoai = "";
    // tinh tong luong theo chuc vu
    this.tinhTongLuong = function () {
        if (this.chucVu === "Sếp") {
            this.tongLuong = parseFloat(this.luongCoBan) * 3;
        } else if (this.chucVu === "Trưởng phòng") {
            this.tongLuong = parseFloat(this.luongCoBan) * 2;
        } else if (this.chucVu === "Nhân viên") {
            this.tongLuong = parseFloat(this.luongCoBan) * 1;
        }
    };
    // xep loai nhan vien theo gio lam
    this.tinhXepLoai = function () {
        if (this.gioLam >= 192) {
            this.xepLoai = "xuất sắc";
        } else if (this.gioLam >= 176) {
            this.xepLoai = "Giỏi";
        } else if (this.gioLam >= 160) {
            this.xepLoai = "Khá";
        } else {
            this.xepLoai = "TB";
        }
    };
}
