#include "include/framework.h"
#include "include/util.h"
#include "include/handles.h"
#include "include/logger.h"
#include "include/resource.h"

// Constants
constexpr int MAX_LOAD_STRING = 100;

constexpr int WINDOW_WIDTH = 450;
constexpr int WINDOW_HEIGHT = 600;
constexpr int MENU_HEIGHT = 19;
constexpr int STATUSBAR_HEIGHT = 23;
constexpr int PADDING = 8;

constexpr int MIN_CLIENT_X = PADDING;
constexpr int MAX_CLIENT_X = WINDOW_WIDTH - PADDING;
constexpr int MIN_CLIENT_Y = PADDING;
constexpr int MAX_CLIENT_Y = WINDOW_HEIGHT - MENU_HEIGHT - STATUSBAR_HEIGHT - PADDING;
constexpr int MAX_CLIENT_WIDTH = MAX_CLIENT_X - MIN_CLIENT_X;
constexpr int MAX_CLIENT_HEIGHT = MAX_CLIENT_Y - MIN_CLIENT_Y;

constexpr int SQUARE_SIZE = 25;
constexpr int FORM_INPUT_WIDTH = 110;

constexpr int LIST_VIEW_COLUMNS = 4;
constexpr int LIST_VIEW_ROWS = 50;
constexpr int STATUS_BAR_PARTS[4] = {135, 235, 335, 450};

// Global Variables:
WCHAR windowTitle[MAX_LOAD_STRING];
WCHAR windowClass[MAX_LOAD_STRING];

// Forward declarations
ATOM MyRegisterClass();

BOOL InitInstance(int);

LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);

INT_PTR CALLBACK About(HWND, UINT, WPARAM, LPARAM);

int APIENTRY wWinMain(_In_ HINSTANCE hInstance,
                      _In_opt_ HINSTANCE hPrevInstance,
                      _In_ LPWSTR lpCmdLine,
                      _In_ const int nShowCmd) {
    UNREFERENCED_PARAMETER(hPrevInstance);
    UNREFERENCED_PARAMETER(lpCmdLine);
    instanceHandle = hInstance;
    brushHandle = CreateSolidBrush(RGB(240, 240, 240));

    INITCOMMONCONTROLSEX icex;
    icex.dwSize = sizeof(INITCOMMONCONTROLSEX);
    icex.dwICC = ICC_TREEVIEW_CLASSES | ICC_LISTVIEW_CLASSES | ICC_STANDARD_CLASSES;

    if (!InitCommonControlsEx(&icex)) {
        logger->warn("Initialization of common controls failed");
    }

    LoadString(instanceHandle, IDS_APP_TITLE, windowTitle, MAX_LOAD_STRING);
    LoadString(instanceHandle, IDC_TESTAPP, windowClass, MAX_LOAD_STRING);
    MyRegisterClass();

    if (!InitInstance(nShowCmd)) {
        logger->error("Failed to initialize the application. Reason: " + DecodeError(GetLastError()));
        return FALSE;
    }

    HACCEL hAccelTable = LoadAccelerators(instanceHandle, MAKEINTRESOURCE(IDC_TESTAPP));

    MSG msg;

    while (GetMessage(&msg, nullptr, 0, 0)) {
        if (!TranslateAccelerator(msg.hwnd, hAccelTable, &msg)) {
            TranslateMessage(&msg);
            DispatchMessage(&msg);
        }
    }

    return static_cast<int>(msg.wParam);
}

ATOM MyRegisterClass() {
    WNDCLASSEXW wcex;

    wcex.cbSize = sizeof(WNDCLASSEX);

    wcex.style = CS_HREDRAW | CS_VREDRAW;
    wcex.lpfnWndProc = WndProc;
    wcex.cbClsExtra = 0;
    wcex.cbWndExtra = 0;
    wcex.hInstance = instanceHandle;
    wcex.hIcon = LoadIcon(instanceHandle, MAKEINTRESOURCE(IDI_TESTAPP));
    wcex.hCursor = LoadCursor(nullptr, IDC_ARROW);
    wcex.hbrBackground = brushHandle;
    wcex.lpszMenuName = MAKEINTRESOURCE(IDC_TESTAPP);
    wcex.lpszClassName = windowClass;
    wcex.hIconSm = LoadIcon(wcex.hInstance, MAKEINTRESOURCE(IDI_TESTAPP));

    return RegisterClassEx(&wcex);
}

BOOL InitInstance(const int nCmdShow) {
    RECT rect = {0, 0, WINDOW_WIDTH, WINDOW_HEIGHT};

    AdjustWindowRectEx(&rect, WS_OVERLAPPED | WS_CAPTION | WS_SYSMENU, FALSE, 0);

    windowHandle = CreateWindow(
        windowClass,
        windowTitle,
        WS_OVERLAPPED | WS_CAPTION | WS_SYSMENU,
        2560 + 50,
        50,
        rect.right - rect.left,
        rect.bottom - rect.top,
        nullptr,
        nullptr,
        instanceHandle,
        nullptr);

    if (!windowHandle) {
        return FALSE;
    }

    ShowWindow(windowHandle, nCmdShow);
    UpdateWindow(windowHandle);

    return TRUE;
}

LRESULT CALLBACK WndProc(HWND windowHandle, const UINT message, const WPARAM wParam, const LPARAM lParam) {
    switch (message) {
        case WM_CREATE: {
            fontHandle = CreateFont(
                18,
                0,
                0,
                0,
                FW_NORMAL,
                FALSE,
                FALSE,
                FALSE,
                DEFAULT_CHARSET,
                OUT_DEFAULT_PRECIS,
                CLIP_DEFAULT_PRECIS,
                CLEARTYPE_QUALITY,
                VARIABLE_PITCH,
                L"Segoe UI");

            firstNameEditHandle = CreateEdit(
                windowHandle,
                IDC_FIRST_NAME_EDIT,
                L"First Name",
                MIN_CLIENT_X,
                MIN_CLIENT_Y,
                MAX_CLIENT_WIDTH / 2 - PADDING / 2,
                21);

            lastNameEditHandle = CreateEdit(
                windowHandle,
                IDC_LAST_NAME_EDIT,
                L"Last Name",
                MIN_CLIENT_X,
                GetRectRelativeToParent(firstNameEditHandle, windowHandle).bottom + PADDING,
                MAX_CLIENT_WIDTH / 2 - PADDING / 2,
                21);

            aboutMeEditHandle = CreateEdit(
                windowHandle,
                IDC_ABOUT_ME_EDIT,
                L"About Me",
                MIN_CLIENT_X,
                GetRectRelativeToParent(lastNameEditHandle, windowHandle).bottom + PADDING,
                MAX_CLIENT_WIDTH / 2 - PADDING / 2,
                100,
                ES_MULTILINE | WS_VSCROLL | ES_AUTOVSCROLL);

            okButtonHandle = CreateButton(
                windowHandle,
                IDC_OK,
                L"OK",
                MIN_CLIENT_X,
                GetRectRelativeToParent(aboutMeEditHandle, windowHandle).bottom + PADDING,
                MAX_CLIENT_WIDTH / 4 - PADDING / 2,
                30);

            cancelButtonHandle = CreateButton(
                windowHandle,
                IDC_CANCEL,
                L"Cancel",
                GetRectRelativeToParent(okButtonHandle, windowHandle).right + PADDING,
                GetRectRelativeToParent(aboutMeEditHandle, windowHandle).bottom + PADDING,
                MAX_CLIENT_WIDTH / 4 - PADDING / 2,
                30);

            treeListViewHandle = CreateTreeListView(
                windowHandle,
                IDC_TREE_LIST_VIEW,
                MAX_CLIENT_WIDTH / 2 + PADDING * 1.5,
                MIN_CLIENT_Y,
                MAX_CLIENT_WIDTH / 2 - PADDING / 2,
                GetRectRelativeToParent(okButtonHandle, windowHandle).bottom - PADDING);

            listViewHandle = CreateWindowEx(
                0,
                WC_LISTVIEW,
                L"List View",
                WS_VISIBLE | WS_CHILD | WS_BORDER | LVS_REPORT,
                MIN_CLIENT_X,
                GetRectRelativeToParent(okButtonHandle, windowHandle).bottom + PADDING,
                MAX_CLIENT_WIDTH,
                200,
                windowHandle,
                nullptr,
                instanceHandle,
                nullptr);

            ListView_SetExtendedListViewStyle(listViewHandle, LVS_EX_FULLROWSELECT | LVS_EX_DOUBLEBUFFER);

            LVCOLUMN lvColumn;
            lvColumn.mask = LVCF_TEXT | LVCF_WIDTH | LVCF_SUBITEM;
            lvColumn.cx = 100;

            for (int column = 0; column < LIST_VIEW_COLUMNS; column++) {
                WCHAR text[20];
                swprintf(text, 20, L"Column %d", column + 1);
                lvColumn.pszText = text;
                lvColumn.iSubItem = column;
                ListView_InsertColumn(listViewHandle, column, &lvColumn);
            }

            for (int row = 0; row < LIST_VIEW_ROWS; row++) {
                for (int column = 0; column < LIST_VIEW_COLUMNS; column++) {
                    WCHAR text[20];
                    swprintf(text, 20, L"R%d C%d", row + 1, column + 1);
                    AddListViewItem(listViewHandle, text, row, column);
                }
            }

            HWND checkBoxOne = CreateCheckBox(
                windowHandle,
                L"Check Box 1",
                PADDING,
                GetRectRelativeToParent(listViewHandle, windowHandle).bottom + PADDING,
                FORM_INPUT_WIDTH,
                30);

            HWND checkBoxTwo = CreateCheckBox(
                windowHandle,
                L"Check Box 2",
                PADDING,
                GetRectRelativeToParent(checkBoxOne, windowHandle).bottom,
                FORM_INPUT_WIDTH,
                30);

            CreateCheckBox(
                windowHandle,
                L"Check Box 3",
                PADDING,
                GetRectRelativeToParent(checkBoxTwo, windowHandle).bottom,
                FORM_INPUT_WIDTH,
                30);

            HWND radioButtonOne = CreateRadioButton(
                windowHandle,
                L"Radio Button 1",
                GetRectRelativeToParent(checkBoxOne, windowHandle).right,
                GetRectRelativeToParent(listViewHandle, windowHandle).bottom + PADDING,
                FORM_INPUT_WIDTH,
                30);

            HWND radioButtonTwo = CreateRadioButton(
                windowHandle,
                L"Radio Button 2",
                GetRectRelativeToParent(checkBoxOne, windowHandle).right,
                GetRectRelativeToParent(radioButtonOne, windowHandle).bottom,
                FORM_INPUT_WIDTH,
                30);

            CreateRadioButton(
                windowHandle,
                L"Radio Button 3",
                GetRectRelativeToParent(checkBoxOne, windowHandle).right,
                GetRectRelativeToParent(radioButtonTwo, windowHandle).bottom,
                FORM_INPUT_WIDTH,
                30);

            CreateStaticText(
                windowHandle,
                L"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam ultricies nulla eu enim euismod, id euismod mi gravida.",
                GetRectRelativeToParent(radioButtonOne, windowHandle).right + PADDING,
                GetRectRelativeToParent(listViewHandle, windowHandle).bottom + PADDING + 5,
                155,
                MAX_CLIENT_HEIGHT - GetRectRelativeToParent(listViewHandle, windowHandle).bottom);

            statusBarHandle = CreateWindowEx(
                0,
                STATUSCLASSNAME,
                nullptr,
                WS_CHILD | WS_VISIBLE,
                0,
                0,
                0,
                0,
                windowHandle,
                nullptr,
                instanceHandle,
                nullptr);

            SendMessage(statusBarHandle, SB_SETPARTS, sizeof(STATUS_BAR_PARTS) / sizeof(int),
                        reinterpret_cast<LPARAM>(STATUS_BAR_PARTS));
            SendMessage(statusBarHandle, SB_SETTEXT, 1, reinterpret_cast<LPARAM>(L" Status 1"));
            SendMessage(statusBarHandle, SB_SETTEXT, 2, reinterpret_cast<LPARAM>(L" Status 2"));
            SendMessage(statusBarHandle, SB_SETTEXT, 3, reinterpret_cast<LPARAM>(L" Status 3"));

            SetTheme(listViewHandle);
            SetTheme(treeListViewHandle);
        }

        break;

        case WM_COMMAND: {
            switch (LOWORD(wParam)) {
                case IDM_HELP_ABOUT:
                    DialogBox(instanceHandle, MAKEINTRESOURCE(IDD_ABOUT_BOX), windowHandle, About);
                    break;

                case IDM_FILE_EXIT:
                    DestroyWindow(windowHandle);
                    break;

                case IDC_OK:
                    MessageBox(windowHandle, L"OK button clicked", L"OK", MB_OK | MB_ICONINFORMATION);
                    break;

                case IDC_CANCEL:
                    MessageBox(windowHandle, L"Cancel button clicked", L"Cancel", MB_OK | MB_ICONINFORMATION);
                    break;

                default:
                    return DefWindowProc(windowHandle, message, wParam, lParam);
            }
        }
        break;

        case WM_PAINT: {
            PAINTSTRUCT ps;
            HDC hdc = BeginPaint(windowHandle, &ps);

            HBRUSH hBrushOrange = CreateSolidBrush(RGB(241, 79, 33));
            HBRUSH hBrushGreen = CreateSolidBrush(RGB(127, 186, 0));
            HBRUSH hBrushBlue = CreateSolidBrush(RGB(0, 163, 238));
            HBRUSH hBrushYellow = CreateSolidBrush(RGB(254, 184, 0));

            const auto hNullPen = static_cast<HPEN>(GetStockObject(NULL_PEN));
            const auto hOldPen = static_cast<HPEN>(SelectObject(hdc, hNullPen));
            const auto hOldBrush = static_cast<HBRUSH>(SelectObject(hdc, hBrushOrange));

            Rectangle(
                hdc,
                MAX_CLIENT_X - SQUARE_SIZE * 2,
                MAX_CLIENT_Y - SQUARE_SIZE * 2,
                MAX_CLIENT_X - SQUARE_SIZE,
                MAX_CLIENT_Y - SQUARE_SIZE);

            SelectObject(hdc, hBrushGreen);
            Rectangle(
                hdc,
                MAX_CLIENT_X - SQUARE_SIZE,
                MAX_CLIENT_Y - SQUARE_SIZE * 2,
                MAX_CLIENT_X,
                MAX_CLIENT_Y - SQUARE_SIZE);

            SelectObject(hdc, hBrushBlue);
            Rectangle(
                hdc,
                MAX_CLIENT_X - SQUARE_SIZE * 2,
                MAX_CLIENT_Y - SQUARE_SIZE,
                MAX_CLIENT_X - SQUARE_SIZE,
                MAX_CLIENT_Y);

            SelectObject(hdc, hBrushYellow);
            Rectangle(
                hdc,
                MAX_CLIENT_X - SQUARE_SIZE,
                MAX_CLIENT_Y - SQUARE_SIZE,
                MAX_CLIENT_X,
                MAX_CLIENT_Y);

            SelectObject(hdc, hOldPen);
            SelectObject(hdc, hOldBrush);

            DeleteObject(hBrushOrange);
            DeleteObject(hBrushGreen);
            DeleteObject(hBrushBlue);
            DeleteObject(hBrushYellow);

            EndPaint(windowHandle, &ps);

            break;
        }

        case WM_DESTROY:
            PostQuitMessage(0);
            break;

        default:
            return DefWindowProc(windowHandle, message, wParam, lParam);
    }
    return 0;
}

INT_PTR CALLBACK About(HWND hDlg, const UINT message, const WPARAM wParam, LPARAM lParam) {
    UNREFERENCED_PARAMETER(lParam);

    switch (message) {
        case WM_INITDIALOG:
            return TRUE;

        case WM_COMMAND:
            if (LOWORD(wParam) == IDOK || LOWORD(wParam) == IDCANCEL) {
                EndDialog(hDlg, LOWORD(wParam));
                return TRUE;
            }
            break;

        default:
            return FALSE;
    }

    return FALSE;
}
