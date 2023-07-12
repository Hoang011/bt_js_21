function validation() {
    this.kiemTraRong = function (value, errorId, mess) {
        if (value === "") {
            getId(errorId).innerHTML = mess;
            getId(errorId).style.display = "inline-block";
            return false;
        }
        getId(errorId).innerHTML = "";
        getId(errorId).style.display = "none";
        return true;
    };
    // kiểm tra select
    this.kiemTraSelect = function (idSelect, errorId, mess) {
        var select = getId(idSelect);
        if (select.selectedIndex !== 0) {
            getId(errorId).innerHTML = "";
            getId(errorId).style.display = "none";
            return true;
        }
        getId(errorId).innerHTML = mess;
        getId(errorId).style.display = "inline-block";
        return false;
    };
    // kiểm tra độ dìa kí tự
    this.kiemTraDoDaiKyTu = function (value, errorId, mess, min, max) {
        if (min <= value.trim().length && value.trim().length <= max) {
            getId(errorId).innerHTML = "";
            getId(errorId).style.display = "none";
            return true;
        }
        getId(errorId).innerHTML = mess;
        getId(errorId).style.display = "inline-block";
        return false;
    };
    // kiểm tra so
    this.kiemTraSo = function (value, errorId, mess, min, max) {
        if (min <= value && value <= max) {
            getId(errorId).innerHTML = "";
            getId(errorId).style.display = "none";
            return true;
        }
        getId(errorId).innerHTML = mess;
        getId(errorId).style.display = "inline-block";
        return false;
    }
    // kiem tra ky tu
    this.checkPattern = function (value, errorId, mess, letter) {
        if (value.match(letter)) {
            getId(errorId).innerHTML = "";
            getId(errorId).style.display = "none";
            return true;
        }
        getId(errorId).innerHTML = mess;
        getId(errorId).style.display = "inline-block";
        return false;
    };
    this.kiemTraNVDaTonTai = function (value, errorId, mess, danhSachNV) {
        //flag khong ton tai:
        var isExist = false;
        for (var i = 0; i < danhSachNV.length; i++) {
            var nv = danhSachNV[i];
            if (nv.taiKhoan === value) {
                isExist = true;
                break;
            }
        }
        if (isExist) {
            getId(errorId).innerHTML = mess;
            getId(errorId).style.display = "inline-block";
            return false;
        }
        getId(errorId).innerHTML = "";
        getId(errorId).style.display = "none";
        return true;
    };
}
