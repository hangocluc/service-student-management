// Mock database with in-memory storage
let students = [
    {
        maSV: "SV001",
        hoTen: "Nguyen Van A",
        ngaySinh: "2000-01-01",
        gioiTinh: "Nam",
        maLop: "L01"
    },
    {
        maSV: "SV002",
        hoTen: "Tran Thi B",
        ngaySinh: "2000-02-02",
        gioiTinh: "Nu",
        maLop: "L01"
    },
    {
        maSV: "SV003",
        hoTen: "Le Van C",
        ngaySinh: "2000-03-03",
        gioiTinh: "Nam",
        maLop: "L02"
    },
    {
        maSV: "SV004",
        hoTen: "Pham Thi D",
        ngaySinh: "2000-04-04",
        gioiTinh: "Nu",
        maLop: "L02"
    },
    {
        maSV: "SV005",
        hoTen: "Hoang Van E",
        ngaySinh: "2000-05-05",
        gioiTinh: "Nam",
        maLop: "L03"
    }
];

// Mock users data
let users = [
    {
        USERNAME: "admin",
        PASSWORD: "admin123",
        ROLE: "ADMIN"
    },
    {
        USERNAME: "user1",
        PASSWORD: "user123",
        ROLE: "USER"
    }
];

// Mock khoa data
let khoa = [
    {
        maKhoa: "KH001",
        tenKhoa: "Công nghệ thông tin"
    },
    {
        maKhoa: "KH002",
        tenKhoa: "Điện tử viễn thông"
    },
    {
        maKhoa: "KH003",
        tenKhoa: "Cơ khí"
    }
];

// Mock lop data
let lop = [
    {
        maLop: "L01",
        tenLop: "CNTT1",
        maKhoa: "KH001"
    },
    {
        maLop: "L02",
        tenLop: "CNTT2",
        maKhoa: "KH001"
    },
    {
        maLop: "L03",
        tenLop: "DTVT1",
        maKhoa: "KH002"
    }
];

module.exports = {
    students,
    users,
    khoa,
    lop
}; 