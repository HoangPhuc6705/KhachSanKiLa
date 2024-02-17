const start = () => {
  $(".welcome").remove();
  $(".start").remove();
}

const contain = $(".container")
const createLayout = () => {
  const box = $("<div>");
  box.addClass("box");
  const room = $("<div>");
  room.addClass("room");
  const main = $("<div>");
  main.addClass("main");
  const notice = $("<div>");
  notice.addClass("notice");
  contain.append(box);
  contain.append(notice);
  $(".box").append(room);
  $(".box").append(main);
  contain.removeClass("container");
  contain.addClass("layoutGame");
}

const theFirstFloor = () => {
  const floors = $(".room");
  floors.append("<div>");
  floors.append("<div>");
  floors.append("<div>");
  floors.append("<div>");
  $(".room div").eq(0).text("PHÒNG TIẾP TÂN");
  $(".room div").eq(1).text("PHÒNG 101");
  $(".room div").eq(2).text("PHÒNG 102");
  $(".room div").eq(3).text("THANG MÁY");
  $(".room div").addClass("rooms-select");

  $(".room div").eq(0).addClass("room-main");
  PhongTiepTan();

  $(".room div").eq(0).click(function () {
    if (!play) return;
    TheRoom(0);
    $(".main div").remove();
    $(".notice p").text(" ");
    PhongTiepTan();
  });
  $(".room div").eq(1).click(function () {
    if (!play) return;
    TheRoom(1);
    $(".main div").remove();
    $(".notice p").text(" ");
    Phong101();
  });
  $(".room div").eq(2).click(function () {
    if (!play) return;
    TheRoom(2);
    $(".main div").remove();
    $(".notice p").text(" ");
    if (lock == true) {
      PassCode102();
    } else {
      Phong102();
    }
  });
  $(".room div").eq(3).click(function () {
    if (!play) return;
    TheRoom(3);
    $(".notice p").text(" ");
    $(".main div").remove();
    ThangMay();
  });
}

var play = false;
$(".start").click(function () {
  start();
  createLayout();
  theFirstFloor();
  $(".notice").append("<p>");
  $(".notice p").text("Click vào hộp thoại để tiếp tục...");
  $(".notice").click(function () {
    $(".notice p").text(Conversation[k]);
    k++;
    if (k == Conversation.length) {
      play = true;
    }
  })
});

// Đối tượng người chơi
class player {
  constructor(name) {
    this.name = name;
  }

  key = [
    false,
    false,
    false,
    false,
    false
  ]
}
const Alex = new player("Duy Quang");

// Đoạn hội thoại giữa tiếp tân và người chơi
var k = 0;
const Conversation = [
  `Nhân viên tiếp tân: Kính chào quý khách, quý khách cần gì ạ?...`,
  `${Alex.name}: Tôi đến để nhận phòng...`,
  `Nhân viên tiếp tân: Vui lòng xuất trình giấy tờ ạ...`,
  `${Alex.name}: Giấy tờ đây....`,
  `Nhân viên tiếp tân: (Đọc giấy tờ)...`,
  `Nhân viên tiếp tân: Thông tin trên giấy tờ được xác định, quý khách nhận chìa khoá phòng ạ...`,
  `Nhân viên tiếp tân: Phòng của quý khách là 101...`,
  `${Alex.name}: Cảm ơn...`,
  `Nhiệm vụ: Kiểm tra các phòng, tìm các điểm khả nghi, click vào đồ vật để hội thoại`,
]

function TheRoom(r) {
  for (let i = 0; i < 5; i++) {
    if (i == r) {
      $(".room div").eq(i).addClass("room-main");
      $(".room div").eq(i).removeClass("room-main-close");
    } else {
      $(".room div").eq(i).addClass("room-main-close");
      $(".room div").eq(i).remove("room-main");
    }
  }
}

function KhoDo() {
  const khodo = $(".room");
  const okhodo = $("<div>");
  okhodo.css({
    "width": "100%",
    "height": "100%",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "border": "2px solid white",
    "background": "black",
    "cursor": "pointer"
  });
  okhodo.text("Kho đồ");
  okhodo.click(function () {
    KhoDoMain();
  })
  if (KiemTraKhoDo) return;
  khodo.append(okhodo);
  KiemTraKhoDo = true;
}

function KhoDoMain() {
  $(".main div").remove();
  const box = $("<div>");
  $(".main").append(box);
  box.css({
    "width": "100%",
    "height": "100%",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "flex-wrap": "wrap",
    "gap": "2vh"
  });

  for (let i in ListKhoDo) {
    const items = $("<div>");
    box.append(items);

    items.css({
      "width": "20vh",
      "height": "20vh",
      "border": "2px solid white",
      "display": "flex",
      "justify-content": "center",
      "align-items": "center",
      "text-align": "center",
      "cursor": "pointer"
    });
    items.text(ListKhoDo[i]);

    var pass;
    items.click(function () {
      $(".notice p").remove();
      $(".notice").append("<p>");
      if (EnableList[i] == 0) {
        $(".notice p").text("Chưa thể dùng");
      }
      if (EnableList[i] == 2) {
        $(".notice p").text("Tích phân từ 1 tới 9 của hàm số 6x^2 - 7x + 2005dx = ?");
      }
      if (EnableList[i] == 3) {
        if (key) return;
        $(".notice p").text("Nhập mật khẩu 5 chữ số:");
        const inp = $("<input>");
        $(".notice p").append(inp);
        inp.addClass("removeDefaultForm");
        const submit = $("<div>");
        submit.css({
          "width": "20vh",
          "height": "10vh",
          "border": "2px solid white",
          "display": "flex",
          "justify-content": "center",
          "align-items": "center"
        })
        submit.text("Mở");
        $(".notice p").append(submit);
        submit.click(function() {
          pass = inp.val();
          if (pass == PassCodeBox) {
            key = true;
            $(".notice p").text("Ồ 1 cái chìa khoá");
            ListKhoDo.push("Chìa khoá nhỏ");
            EnableList.push(1);
            for (let i in ListKhoDo) {
              if (EnableList[i] == 3) {
                ListKhoDo.splice(i, 1);
                EnableList.splice(i, 1);
              }
            }
            KhoDoMain();
          }
        })
      }
      if (EnableList[i] == 1) {
        $(".notice p").text("Chìa khoá nhỏ");
      }
    })

  }
}

var ListKhoDo = [];
var EnableList = []; //0. Chưa thể dùng tua vít 2. Giải mật thư 3. Passcode 1. mở khoá được
var KiemTraKhoDo = false; //Khoá tạo kho đồ nếu đã nhặt được món đầu tiên
var PassCodeBox = 17216; //Code này của cái hộp, code là kết quả tích phân
var key = false; // Đóng lại khi lụm được chìa khoá

var TuaVit = true;
function PhongTiepTan() {
  var TiepTan = $("<div>");
  var Ghe1 = $("<div>");
  var Ghe2 = $("<div>");
  var GheDai1 = $("<div>"); //Thât ra đây là cái bàn dài:)))
  var GheDai3 = $("<div>"); //
  var GheDai2 = $("<div>");
  var ChauCay1 = $("<div>");
  var ChauCay2 = $("<div>");

  TiepTan.css({
    "position": "absolute",
    "top": '1vh',
    "right": "1vh",
    "width": "40vh",
    "height": "50vh",
    "border": "2px solid white",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "cursor": "pointer"
  });
  TiepTan.append("<p>");
  TiepTan.find("p").text("Bàn tiếp tân").css({
    "transform": "rotate(90deg)",
    "text-align": "center",
    "text-wrap": "nowrap"
  })
  $(".main").append(TiepTan);

  TiepTan.click(function () {
    console.log(HoiTiepTan)
    if (HoiTiepTan) {
      $(".notice p").text(HoiTiepTanveTheSinhVien[h]);
      h++;
      if (h == HoiTiepTanveTheSinhVien.length) {
        HoiTiepTan = false;
        h = 0;
      }
    } else {
      $(".notice p").text("Rất hân hạnh được phục vụ quý khách^^");
    }
  })

  Ghe1.css({
    "position": "absolute",
    "top": '17vh',
    "left": "1vh",
    "width": "15vh",
    "height": "15vh",
    "border": "2px solid white",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "cursor": "pointer"
  })
  Ghe1.append("<p>");
  Ghe1.find("p").text("Ghế đơn").css({
    "transform": "rotate(90deg)",
    "text-align": "center",
    "text-wrap": "nowrap"
  });
  $(".main").append(Ghe1);
  Ghe1.click(function () {
    if (!play) return;
    $(".notice p").text("Ở đây không có gì cả");
  });

  Ghe2.css({
    "position": "absolute",
    "top": "17vh",
    "left": "68vh",
    "width": "15vh",
    "height": "15vh",
    "border": "2px solid white",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "cursor": "pointer"
  })
  Ghe2.append("<p>");
  Ghe2.find("p").text("Ghế đơn").css({
    "transform": "rotate(90deg)",
    "text-align": "center",
    "text-wrap": "nowrap"
  });
  $(".main").append(Ghe2);
  Ghe2.click(function () {
    if (!play) return;
    $(".notice p").text("Ở đây không có gì cả");
  });

  GheDai1.css({
    "position": "absolute",
    "top": "17vh",
    "left": "17vh",
    "width": "50vh",
    "height": "15vh",
    "border": "2px solid white",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "cursor": "pointer"
  })
  GheDai1.append("<p>");
  GheDai1.find("p").text("Cái bàn lớn").css({
    "text-align": "center",
    "text-wrap": "nowrap"
  });
  $(".main").append(GheDai1);

  // Thẻ sinh viên
  var get = false;
  var k = 0;
  var HoiTiepTan = false;
  const StudentCard = [
    `Ồ một cái thẻ sinh viên...`,
    `Trường Đại học Sư phạm kĩ thuật...`,
    `Tên: Ngô Quang Tối...`,
    `Mã số sinh viên: 23129355...`,
    `Ngành: Công nghệ thông tin...`,
    `Chắc phải hỏi tiếp tân.`,
  ]
  var h = 0;
  const HoiTiepTanveTheSinhVien = [
    `Có ai bỏ quên thẻ sinh viên...`,
    `Tiếp tân: À đó là thẻ sinh viên của một anh sinh viên ở phòng 102...`,
    `Tiếp tân: Chắc anh đó để quên thôi ạ...`,
    `Tiếp tân: Quý khách cứ để đó ạ...`,
    `Ok`
  ]
  GheDai1.click(function () {
    if (!play) return;
    $(".notice p").text(StudentCard[k]);
    k++;
    if (k == StudentCard.length) {
      k = 0;
      HoiTiepTan = true;
    }
  })

  GheDai3.css({
    "position": "absolute",
    "top": "1vh",
    "left": "17vh",
    "width": "50vh",
    "height": "15vh",
    "border": "2px solid white",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "cursor": "pointer"
  })
  GheDai3.append("<p>");
  GheDai3.find("p").text("Ghế dài").css({
    "text-align": "center",
    "text-wrap": "nowrap"
  });
  $(".main").append(GheDai3);

  // Bảng báo cáo hư hại của khách sạn
  var HuHai = 0;
  const BaoCaoHuHong = [
    `Một bản báo cáo...`,
    `Báo cáo về sự hư hại của khách sạn...`,
    `Đồ hư hại: Giường...`,
    `Phòng: 102...`,
    `Số lượng: 1...`,
    `Kí tên: ###`
  ]
  GheDai3.click(function () {
    if (!play) return;
    $(".notice p").text(BaoCaoHuHong[HuHai]);
    HuHai++;
    if (HuHai == BaoCaoHuHong.length) {
      HuHai = 0;
    }
  })

  GheDai2.css({
    "position": "absolute",
    "bottom": "1vh",
    "left": "1vh",
    "width": "80vh",
    "height": "15vh",
    "border": "2px solid white",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "cursor": "pointer"
  })
  GheDai2.append("<p>");
  GheDai2.find("p").text("Ghế dài").css({
    "text-align": "center",
    "text-wrap": "nowrap"
  });
  $(".main").append(GheDai2);
  GheDai2.click(function () {
    if (!play) return;
    $(".notice p").text("Ở đây không có gì cả");
  });

  ChauCay1.css({
    "position": "absolute",
    "bottom": "1vh",
    "left": "82vh",
    "width": "15vh",
    "height": "15vh",
    "border-radius": "50%",
    "border": "2px solid white",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "cursor": "pointer"
  })
  ChauCay1.append("<p>");
  ChauCay1.find("p").text("Chậu cây").css({
    "text-align": "center",
    "text-wrap": "nowrap"
  });
  $(".main").append(ChauCay1);
  // Lụm được tua vít
  ChauCay1.click(function () {
    if (!play) return;
    if (!TuaVit) return;
    $(".notice p").text("Lụm được cái tua vít");
    // Tạo kho đồ cho bản thân
    ListKhoDo.push("Tua vít");
    EnableList.push(0);
    KhoDo();
    TuaVit = false;
  })

  ChauCay2.css({
    "position": "absolute",
    "top": "1vh",
    "left": "95vh",
    "width": "15vh",
    "height": "15vh",
    "border-radius": "50%",
    "border": "2px solid white",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "cursor": "pointer"
  })
  ChauCay2.append("<p>");
  ChauCay2.find("p").text("Chậu cây").css({
    "text-align": "center",
    "text-wrap": "nowrap"
  });
  $(".main").append(ChauCay2);
  ChauCay2.click(function () {
    if (!play) return;
    $(".notice p").text("Ở đây không có gì cả");
  });
}

const ChiaKhoaNho = [
  'Ui chìa khoá này mở được nè...',
  'Xem bên trong có gì nào...',
  'Một mảnh giấy bị xé?...',
  'Có nên lên lầu khám phá thử không?...',
  'Khách sạn này thật kì lạ...',
  '(Lấy chìa khoá)'
]
g = 0;
var ChiaKhoaTuDo = false;
function Phong101() {
  var Space = 1;

  var TuDo = $("<div>");
  var TuDo2 = $("<div>");
  var Giuong1 = $("<div>");
  var Giuong2 = $("<div>");
  var BanTron = $("<div>");
  var PhongTam = $("<div>");

  TuDo.css({
    "width": `40vh`,
    "height": "15vh",
    "position": "absolute",
    "border": "2px solid white",
    "top": Space + "vh",
    "right": Space + "vh",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "cursor": "pointer"
  })
  TuDo.append("<p>");
  TuDo.find("p").text("Tủ đồ");
  $(".main").append(TuDo);
  TuDo.click(function () {
    if (key == false) {
      $(".notice p").text("Ủa tủ này bị khoá rồi")
    } else {
      if (g == ChiaKhoaNho.length) return;
      $(".notice p").text(ChiaKhoaNho[g]);
      g++;
      if (g == ChiaKhoaNho.length) {
        ListKhoDo.push("Mảnh giấy bị xé");
        EnableList.push(0);
      }
    }
  })

  TuDo2.css({
    "width": `15vh`,
    "height": "30vh",
    "position": "absolute",
    "border": "2px solid white",
    "top": 30 + "vh",
    "right": Space + "vh",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "cursor": "pointer"
  })
  TuDo2.append("<p>");
  TuDo2.find("p").text("Tủ đồ");
  $(".main").append(TuDo2);
  TuDo2.click(function () {
    $(".notice p").text("Trong tủ này không có gì hết");
  })

  Giuong1.css({
    "width": `30vh`,
    "height": "40vh",
    "position": "absolute",
    "border": "2px solid white",
    "bottom": Space + "vh",
    "right": 50 + "vh",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "cursor": "pointer"
  })
  Giuong1.append("<p>");
  Giuong1.find("p").text("Giường ngủ");
  $(".main").append(Giuong1);
  Giuong1.click(function () {
    $(".notice p").text("Không có gì cả...")
  })

  Giuong2.css({
    "width": `30vh`,
    "height": "40vh",
    "position": "absolute",
    "border": "2px solid white",
    "bottom": Space + "vh",
    "right": 85 + "vh",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "cursor": "pointer"
  })
  Giuong2.append("<p>");
  Giuong2.find("p").text("Giường ngủ");
  $(".main").append(Giuong2);
  Giuong2.click(function () {
    $(".notice p").text("Không có gì cả...")
  })

  BanTron.css({
    "width": `15vh`,
    "height": "15vh",
    "position": "absolute",
    "border": "2px solid white",
    "top": Space + "vh",
    "right": 60 + "vh",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "cursor": "pointer",
    "border-radius": "50%"
  })
  BanTron.append("<p>");
  BanTron.find("p").text("Bàn tròn");
  $(".main").append(BanTron);
  BanTron.click(function () {
    $(".notice p").text("Ngồi ở đây ngắm phong cảnh bên ngoài có vẻ là ý kiến hay");
  })

  PhongTam.css({
    "position": "absolute",
    "width": `20vh`,
    "height": "98%",
    "border": "2px solid white",
    "left": Space + "vh",
    "top": Space + "vh",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "cursor": "pointer"
  })
  PhongTam.append("<p>");
  PhongTam.find("p").text("Phòng tắm");
  $(".main").append(PhongTam);
  PhongTam.click(function () {
    $(".notice p").text("Phòng tắm có vẻ sạch sẽ đấy");
  })
}

var secretPaper = false;
var SecretBox = false;
function Phong102() {
  var Giuong = $("<div>");
  var Ban = $("<div>");
  var Tu = $("<div>");
  var PhongTam = $("<div>");

  const Bed = [
    `Cái giường này nhìn hơi cũ...`,
    `(Thử đá vài cái)...`,
    `Giường có vẻ khá là rung lắc...`,
    `Thử giở tấm nệm lên xem nào...`,
    `...`,
    `VÃI L LUÔN, MIẾNG GỖ BỊ GÃY LÀM ĐÔI`,
    `Thằng nào làm thế ?...`,
    `Ủa...`,
    `Một cái hộp sắt...`,
    `(Lụm)...`,
    `Nó có mật mã à...`,
    `Để giải thử coi sao...`
  ]
  var b = 0;
  Giuong.css({
    "width": "70vh",
    "height": "30vh",
    "position": "absolute",
    "right": "1vh",
    "bottom": "1vh",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "cursor": "pointer",
    "border": "2px solid white"
  });
  Giuong.append("<p>");
  Giuong.find("p").text("Giường");
  $(".main").append(Giuong);
  Giuong.click(function () {
    if (SecretBox) return;
    $(".notice p").text(Bed[b]);
    b++;
    if (b == Bed.length) {
      ListKhoDo.push("Chiếc hộp có khoá");
      KhoDo();
      EnableList.push(3);
      b = 0;
      SecretBox = true;
    }
  })

  Ban.css({
    "width": "30vh",
    "height": "40vh",
    "position": "absolute",
    "right": "1vh",
    "top": "1vh",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "cursor": "pointer",
    "border": "2px solid white"
  });
  Ban.append("<p>");
  Ban.find("p").text("Bàn");
  $(".main").append(Ban);
  // Cái bàn
  var t = 0;
  const itemsOnTable = [
    `Huh, một cái laptop`,
    `Anh này đang làm đồ án tốt nghiệp à`,
    `Kế bên là 2 cuộn băng keo`,
    `(mở hộp bàn)`,
    `Một tờ giấy lạ`,
    `(Bỏ vào túi)`
  ]
  Ban.click(function () {
    if (secretPaper) return;
    $(".notice p").text(itemsOnTable[t]);
    t++;
    if (t == itemsOnTable.length) {
      ListKhoDo.push("Tờ giấy lạ");
      EnableList.push(2);
      t = 0;
      secretPaper = true;
      KhoDo();
    }
  })

  Tu.css({
    "width": "30vh",
    "height": "20vh",
    "position": "absolute",
    "left": "35vh",
    "top": "1vh",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "cursor": "pointer",
    "border": "2px solid white"
  });
  Tu.append("<p>");
  Tu.find("p").text("Tủ đồ");
  $(".main").append(Tu);
  Tu.click(function () {
    $(".notice p").text("Vài bộ quần áo")
  })

  PhongTam.css({
    "width": "30vh",
    "height": "98%",
    "position": "absolute",
    "left": "1vh",
    "top": "1vh",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "cursor": "pointer",
    "border": "2px solid white"
  });
  PhongTam.append("<p>");
  PhongTam.find("p").text("Phòng tắm");
  $(".main").append(PhongTam);
  PhongTam.click(function () {
    $(".notice p").text("Bên này còn thơm nữa")
  })
}

var passCode = 23129355;
var lock = true;
function PassCode102() {
  var box = $("<div>");
  var request = $("<p>");
  var codeForm = $("<input>");
  var submit = $("<div>");

  box.css({
    "width": "100%",
    "height": "100%",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "flex-direction": "column",
    "gap": "2vh"
  });

  submit.css({
    "width": "15vh",
    "height": "6vh",
    "border": "2px solid white",
    "cursor": "pointer",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "flex-direction": "column"
  });
  submit.append("<p>");
  submit.find("p").text("OK");

  request.text("Vui lòng nhập mật khẩu để mở cửa");
  box.append(request);
  codeForm.addClass("removeDefaultForm")
  box.append(codeForm);
  box.append(submit);

  var CodeInp;
  submit.click(function () {
    CodeInp = codeForm.val();
    if (CodeInp == passCode) {
      box.remove();
      Phong102();
      lock = false;
    }
  })

  $(".main").append(box);
}

var NumberFloor = 0;
function ThangMay() {
  var box = $("<div>");
  box.css({
    "width": "100%",
    "height": "100%",
    "display": "flex",
    "justify-content": "center",
    "align-items": "center",
    "gap": "10px",
    "flex-direction": "column"
  })

  var choose = $("<p>");
  choose.text("Chọn lầu");
  var boxFloor = $("<div>");
  boxFloor.css({
    "display": "flex",
    "flex-direction": "row",
    "gap": "3vh"
  })
  var floor = [];
  for (let i = 0; i < 6; i++) {
    floor[i] = $("<div>");
    floor[i].text(i + 1);
    floor[i].css({
      "width": "10vh",
      "height": "10vh",
      "border": "2px solid white",
      "display": "flex",
      "justify-content": "center",
      "align-items": "center",
      "cursor": "pointer"
    });
    floor[i].click(function () {
      if (i == NumberFloor) {
        $(".notice p").text("Bạn hiện đang ở lầu trệt");
      } else {
        $(".notice p").text("Trờ chơi hiện đang phát triển");
      }
    })
    boxFloor.append(floor[i]);
  }
  floor[NumberFloor].css({
    "background": "white",
    "color": "black"
  })

  box.append(choose);
  box.append(boxFloor);

  $(".main").append(box);
}

// Những món vật phầm