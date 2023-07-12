function QLNV() {
    this.arr = [];
    this.themNV = function (nv) {
        this.arr.push(nv);
    };
    //tim vi tri
    this.timViTri = function (taiKhoan) {
        for (var i = 0; i < this.arr.length; i++) {
            var nv = this.arr[i];
            if (nv.taiKhoan === taiKhoan) {
                index = i;
                break;
            }
        }
        return index;
    };
    //xoa nv
    this.xoaNV = function (taiKhoan) {
        var index = this.timViTri(taiKhoan);
        if (index !== -1) {
            this.arr.splice(index, 1);
        }
    };
    // 
    this.layThongTinChiTietNV = function (taiKhoan) {
        var index = this.timViTri(taiKhoan);
        if (index !== -1) {
            var nv = this.arr[index];
        }
        return nv;
    };
    this.capNhatNV = function (nv) {
        getId("tbTKNV").style.display = "none";

        var index = this.timViTri(nv.taiKhoan);
        if (index !== -1) {
            this.arr[index] = nv;
        }
    };
    this.timNV = function (searchName) {
        var arrSearchName = [];
        for (var i = 0; i < this.arr.length; i++) {
            var nv = this.arr[i];
            if (nv.xepLoai.indexOf(searchName) !== -1) {
                arrSearchName.push(nv);
            }
        }
        return arrSearchName
    }
}
