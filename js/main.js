var qlnv = new QLNV();
var validation = new validation();
function getId(id) {
    return document.getElementById(id);
}
getLocalStorage();
function layThongTinNV(isAdd) {
    var taiKhoan = getId("tknv").value;
    var hoTen = getId("name").value;
    var email = getId("email").value;
    var matKhau = getId("password").value;
    var ngayLam = getId("datepicker").value;
    var luongCoBan = getId("luongCB").value;
    var chucVu = getId("chucvu").value;
    var gioLam = getId("gioLam").value;


    var isValid = true;
    if (isAdd) {
        // tk 4 -> 6 số
        isValid &=
            validation.kiemTraRong(taiKhoan, "tbTKNV", "Bạn chưa nhập tài khoản.") &&
            validation.kiemTraDoDaiKyTu(
                taiKhoan,
                "tbTKNV",
                "Tài khoản có độ dài từ 4 đến 6 kí tự",
                4,
                6
            ) &&
            validation.kiemTraNVDaTonTai(
                taiKhoan,
                "tbTKNV",
                "Tài khoản đã tồn tại trên hệ thống",
                qlnv.arr
            );
    }
    //họ tên 
    isValid &=
        validation.kiemTraRong(hoTen, "tbTen", "Bạn chưa nhập họ tên nhân viên") &&
        validation.checkPattern(
            hoTen,
            "tbTen",
            "Tên bao gồm các kí tự chữ",
            "^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" +
            "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" +
            "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+$"
        );
    //Email 
    isValid &=
        validation.kiemTraRong(email, "tbEmail", "Bạn chưa nhập email") &&
        validation.checkPattern(
            email,
            "tbEmail",
            "Email không đúng định dạng",
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        );
    //mật khẩu
    isValid &=
        validation.kiemTraRong(matKhau, "tbMatKhau", "Bạn chưa nhập mật khẩu") &&
        validation.checkPattern(
            matKhau,
            "tbMatKhau",
            "Mật khẩu bao gồm kí tự viết hoa, viết thường, số và kí tự đặc biệt",
            /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{0,}$/
        );
    // Ngày làm
    isValid &=
        validation.kiemTraRong(ngayLam, "tbNgay", "Bạn chưa nhập ngày làm") &&
        validation.checkPattern(
            ngayLam,
            "tbNgay",
            "Định dạng ngày mm/dd/yyyy",
            /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/
        );
    //Lương  1 000 000 - 20 000 000
    isValid &=
        validation.kiemTraRong(luongCoBan, "tbLuongCB", "Bạn chưa nhập lương cơ bản") &&
        validation.checkPattern(
            luongCoBan,
            "tbLuongCB",
            "Lương cơ bản không bao gồm chữ và kí tự đặc biệt",
            /^[0-9]+$/
        ) && validation.kiemTraSo(luongCoBan, "tbLuongCB", "Lương cơ bản lớn hơn 1.000.000 và bé hơn 20.000.000", 1000000, 20000000);
    //Chức vụ 
    isValid &= validation.kiemTraSelect(
        "chucvu",
        "tbChucVu",
        "Bạn chưa chọn chức vụ"
    );
    // giờ làm 80 - 200
    isValid &=
        validation.kiemTraRong(gioLam, "tbGiolam", "Bạn chưa nhập giờ làm") &&
        validation.checkPattern(
            gioLam,
            "tbGiolam",
            "Giờ làm không bao gồm chữ và kí tự đặc biệt",
            /^[0-9]+$/
        ) && validation.kiemTraSo(gioLam, "tbGiolam", "VGiờ làm phải lớn hơn 80 và bé hơn 200", 80, 200);

    if (isValid) {
        var nv = new NhanVien(
            taiKhoan,
            hoTen,
            email,
            matKhau,
            ngayLam,
            luongCoBan,
            chucVu,
            gioLam
        );
        nv.tinhTongLuong();
        nv.tinhXepLoai();
        return nv;
    }
    return null;
}
function renderTable(data) {
    var content = "";
    for (var i = 0; i < data.length; i++) {
        var nv = data[i];

        content += `
        <tr>
            <td> ${nv.taiKhoan} </td>
            <td> ${nv.hoTen} </td>
            <td> ${nv.email} </td>
            <td> ${nv.ngayLam} </td>
            <td> ${nv.chucVu} </td>
            <td> ${nv.tongLuong} </td>
            <td> ${nv.xepLoai} </td>
            <td><button class="btn btn-info" onclick="suaNhanVien('${nv.taiKhoan}')">Sửa</button>
            <button class="btn btn-danger" onclick="xoaNhanVien('${nv.taiKhoan}')">Xóa</button></td>
        </tr>
        `;
    }
    getId("tableDanhSach").innerHTML = content;
}
function themNhanVien() {
    var nv = layThongTinNV(true);
    if (nv) {
        qlnv.themNV(nv);
        renderTable(qlnv.arr);
        setLocalStorage();
    }
}

// luu data vao local storage
function setLocalStorage() {
    var dataString = JSON.stringify(qlnv.arr);
    localStorage.setItem("QLNV", dataString);
}
function getLocalStorage() {
    if (localStorage.getItem("QLNV")) {
        var dataString = localStorage.getItem("QLNV");
        var dataJSON = JSON.parse(dataString);
        qlnv.arr = dataJSON;
        renderTable(qlnv.arr);
    }
}
function xoaNhanVien(taiKhoan) {
    qlnv.xoaNV(taiKhoan);
    renderTable(qlnv.arr);
    setLocalStorage();
}
function suaNhanVien(taiKhoan) {
    var nv = qlnv.layThongTinChiTietNV(taiKhoan);
    if (nv) {
        getId("btnThem").click();
        getId("tknv").value = nv.taiKhoan;
        getId("tknv").disabled = true;
        getId("name").value = nv.hoTen;
        getId("email").value = nv.email;
        getId("password").value = nv.matKhau;
        getId("datepicker").value = nv.ngayLam;
        getId("luongCB").value = nv.luongCoBan;
        getId("chucvu").value = nv.chucVu;
        getId("gioLam").value = nv.gioLam;
    }
}
function capNhatNhanVien() {
    var nv = layThongTinNV(false);
    if (nv) {
        qlnv.capNhatNV(nv);
        renderTable(qlnv.arr);
        setLocalStorage();
    }
}
function timNV() {
    var searchName = getId("searchName").value;
    var arrSearchName = qlnv.timNV(searchName);
    renderTable(arrSearchName);
}
getId("searchName").addEventListener("keyup", timNV);
