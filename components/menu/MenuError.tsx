'use client';

/**
 * MenuError Component
 * Story 1.1: Menu Display Page
 *
 * Error state with retry button for the menu page
 */

interface MenuErrorProps {
  message?: string;
  onRetry?: () => void;
}

export function MenuError({ message, onRetry }: MenuErrorProps) {
  const defaultMessage = 'Không thể tải menu. Vui lòng thử lại.';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        {/* Error icon */}
        <div className="mx-auto w-16 h-16 mb-6 rounded-full bg-red-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Error message */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Có lỗi xảy ra
        </h2>
        <p className="text-gray-600 mb-6">{message || defaultMessage}</p>

        {/* Retry button */}
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors min-h-[44px] min-w-[44px]"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Thử lại
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * NotFound Component for tenant not found errors
 */
export function MenuNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-sm">
        {/* 404 icon */}
        <div className="mx-auto w-16 h-16 mb-6 rounded-full bg-gray-100 flex items-center justify-center">
          <svg
            className="w-8 h-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Message */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Không tìm thấy cửa hàng
        </h2>
        <p className="text-gray-600">
          Cửa hàng bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
        </p>
      </div>
    </div>
  );
}
