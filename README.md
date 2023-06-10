# Ecommerce Api

# Mô tả ngắn về dự án
API cho hệ thống thương mại điện tử cơ bản
## Chức năng chính
1. Đăng ký
2. Đăng nhập
3. Đăng xuất và xác thực người dùng
4. Tạo Access Token và Refresh Token
5. Xử lý tài khoản đã bị lộ Refresh Token
6. Tạo sản phẩm, áp dùng Factory Pattern
...

## Cài đặt
Hướng dẫn cài đặt và thiết lập dự án.
### Cài đặt package và chạy chương trình
- Cài đặt gói lệnh :  __yarn__
- Chạy chương trình: __yarn dev__
## Sử dụng

Hướng dẫn về cách sử dụng dự án và các chức năng chính.
1. Tải và cài đặt post man
2. Đăng ký
![](https://github.com/truongnhudatt/shopee-api/blob/main/docs/register-user.png)
3. Đăng nhập
![](https://github.com/truongnhudatt/shopee-api/blob/main/docs/login-user.png)
4. Đăng xuất
- Đăng xuất cần phải xác thực người dùng, phải chính xác rằng người dùng đó đăng xuất bằng cách thêm access token vào headers và _id của người dùng đó đồng thời xoá key ra khỏi kệ thống
![](https://github.com/truongnhudatt/shopee-api/blob/main/docs/logout-user.png)
5. Dùng refesh token để yêu cầu access token mới
- Verify refresh token, kiểm tra xem refresh token đó đã được dùng hay chưa
+ Nếu chưa sử dụng thì yêu cầu token mới
+ Nếu đã được sử dụng thì sẽ tiến hành đăng xuất tài khoản và yêu cầu người dùng đăng nhập lại
![]([docs\](https://github.com/truongnhudatt/shopee-api/blob/main/docs/rf-for-ac.png)
6. Tạo sản phẩm mới
![](https://github.com/truongnhudatt/shopee-api/blob/main/docs/pre-create-product.png)
![](https://github.com/truongnhudatt/shopee-api/blob/main/docs/create-product.png)

## Đóng góp

Hướng dẫn và quy tắc để đóng góp vào dự án.

## Giấy phép

Thông tin về giấy phép của dự án.

## Liên hệ

Thông tin liên hệ và cách liên lạc với tác giả hoặc nhóm phát triển.
