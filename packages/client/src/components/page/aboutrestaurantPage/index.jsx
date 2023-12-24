import React from "react";
import { Grid, Typography, Container, Card, CardMedia } from "@mui/material";
import ResponsiveAppBar from "../../nav-bar";
import Footer from "../../footer";

const AboutUsPage = () => {
  return (
    <Grid>
      <ResponsiveAppBar />
      <Container>
        <Grid container spacing={4} marginTop={4} marginBottom={20}>
          <Grid item xs={12}>
            <Typography variant="h4" align="center" gutterBottom>
              Về Chúng Tôi
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" align="center">
              Chào mừng bạn đến với nhà hàng Phương nam, nơi chúng tôi luôn nỗ
              lực mang đến những trải nghiệm ẩm thực tuyệt vời cho khách hàng
              của mình.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Lịch Sử Của Chúng Tôi
            </Typography>
            <Typography variant="body1">
              Được thành lập từ tình yêu, niềm đam mê bất tận với các món ăn và
              nếp văn hóa của người dân Nam Bộ, Nhà hàng Phương Nam đã chính
              thức đi vào hoạt động tháng 12/2010 (tại địa chỉ số 2 ngõ 69 Chùa
              Láng – Hà Nội), mang một làn gió ẩm thực mới đến với người Hà Nội.
              <br />
              <br />
              Chỉ sau 2 năm hoạt động, với tiêu chí, luôn nỗ lực không ngừng để
              có những món ăn ngon, nhân viên phục vụ thân thiện và dịch vụ tốt
              làm hài lòng mọi quý khách hàng (ngay cả những thực khách khó tính
              nhất), Nhà hàng Phương Nam đã mở rộng quy mô hoạt động, thành lập
              cơ sở 2 tại 13 Mai Hắc Đế, Hai Bà Trưng và cơ sở 3 tại 35 Dịch
              Vọng Hậu, Cầu Giấy – Hà Nội, giúp thỏa mãn “cơn nghiện” của nhiều
              tín đồ mê đồ ăn Nam Bộ hơn nữa.
              <br />
              <br />
              Liên tục cải tiến về chất lượng và đa dạng hóa món ăn, đến nay,
              trong thực đơn Nhà hàng Phương Nam đã có hơn 50 món ăn mang bản
              sắc, dấu ấn riêng của người Nam Bộ. Không chỉ vậy, với tiêu chí,
              mang đúng “hơi thở và linh hồn” của món ăn người dân bản xứ, cùng
              với sự chỉn chu trong nấu nướng của bếp trưởng, tất cả các nguyên
              liệu chế biến món ăn tại Nhà hàng Phương Nam đều được vận chuyển
              từ trong miền Nam ra Hà Nội nhưng phải giữ được sự tươi ngon. Đây
              chính là một trong số những lý do, giúp Nhà hàng Phương Nam chinh
              phục được cả những thực khách khó tính, rất sành về ẩm thực Nam
              Bộ.
              <br />
              <br />
              Đến với Nhà hàng Phương Nam, quý khách hàng không chỉ được thỏa
              mãn vị giác, thị giác, xúc giác với Menu hơn 50 món ăn Nam Bộ tự
              chọn mà còn được phục vụ kiểu chuẩn chất người Miền Nam, gần gũi,
              thân thiện mà ấm áp. Một số món ăn khi đến với Nhà hàng Phương
              Nam, bạn không thể không thử: Lẩu cá linh – Bông điên điển, Lẩu cá
              kèo lá giang, Cá linh chiên giòn, Lẩu mắm…
              <br />
              <br />
              Bởi vậy, nếu bạn là người Phương Nam ra Hà Nội lập nghiệp, hoặc
              nếu bạn chưa có cơ hội thử nét đặc sắc của ẩm thực Nam Bộ lần nào
              hoặc vị giác đã “trót nghiện” với món ăn Nam Bộ và bạn đang “lên
              cơn thèm”… còn chờ gì nữa, hãy liên hệ ngay với chúng tôi qua Tổng
              đài 18002028 để đặt bàn và được tư vấn chu đáo nhất nhé!
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="/image/kg1_grande.jpg"
                alt="Image 1"
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="/image/kg2_grande.jpg"
                alt="Image 2"
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardMedia
                component="img"
                height="200"
                image="/image/nha-hang-phuong-nam-ha-long-chon-dung-chan-huu-tinh-cho-moi-du-khach-1641871374.jpg"
                alt="Image 3"
              />
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Mục Tiêu Của Chúng Tôi
            </Typography>
            <Typography variant="body1">
              Tại Nhà Hàng Phương Nam, mục tiêu của chúng tôi không chỉ dừng lại
              ở việc cung cấp các món ăn ngon mà còn là mang đến một trải nghiệm
              ẩm thực toàn diện, kết hợp giữa hương vị tuyệt vời và không gian
              thư giãn, tạo nên những kỷ niệm đáng nhớ cho khách hàng. Chúng tôi
              luôn đặt lợi ích và sự hài lòng của khách hàng lên hàng đầu, từ
              việc chọn lựa nguyên liệu tươi ngon, chất lượng cho đến cách phục
              vụ tận tâm và chu đáo.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              Điểm Mạnh Của Nhà Hàng Phương Nam
            </Typography>
            <Typography variant="body1">
              Điểm mạnh của chúng tôi là sự sáng tạo và đổi mới trong việc pha
              chế và biến tấu các món ăn truyền thống, mang đến một trải nghiệm
              ẩm thực mới lạ và thú vị. Chúng tôi luôn tận dụng những nguyên
              liệu tươi ngon nhất để tạo ra các món ăn hấp dẫn và đậm đà hương
              vị, phục vụ từ trái tim để khách hàng có được trải nghiệm ẩm thực
              hoàn hảo nhất.
            </Typography>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </Grid>
  );
};

export default AboutUsPage;
