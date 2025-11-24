export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-b from-primary-50 to-white p-4">
      <div className="max-w-md text-center">
        <h1 className="text-4xl font-bold text-primary-700 mb-4">
          🌐 LocalStore Menu
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Thực đơn số hóa cho các cửa hàng Việt Nam
        </p>
        <div className="bg-white rounded-lg shadow-md p-6 text-left">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">
            Chào mừng bạn đến với LocalStore Platform
          </h2>
          <p className="text-gray-600 mb-4">
            Hệ thống menu di động được tối ưu hóa cho thiết bị Android và mạng 4G.
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <div className="flex items-center">
              <span className="mr-2">✓</span>
              <span>Tải nhanh {'<'} 2 giây</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">✓</span>
              <span>Định dạng VND chính xác</span>
            </div>
            <div className="flex items-center">
              <span className="mr-2">✓</span>
              <span>Hỗ trợ mã QR</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
