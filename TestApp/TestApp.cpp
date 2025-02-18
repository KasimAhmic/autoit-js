// TestApp.cpp : Defines the entry point for the application.
//

#include "framework.h"
#include "TestApp.h"

#define MAX_LOADSTRING 100

#pragma comment(lib, "Comctl32.lib")
#pragma comment(lib, "UxTheme.lib")

#define IDI_OK 101
#define IDI_CANCEL 102

// Constants
constexpr int WINDOW_WIDTH = 450;
constexpr int WINDOW_HEIGHT = 600;

// Global Variables:
HWND hFirstNameEdit;
HWND hLastNameEdit;
HWND hAboutMeEdit;
HWND hOkButton;
HWND hCancelButton;
HWND hTreeListView;
HWND hListView;
HWND hStatusBar;
WCHAR szTitle[MAX_LOADSTRING];       // The title bar text
WCHAR szWindowClass[MAX_LOADSTRING]; // the main window class name

// Forward declarations of functions included in this code module:
ATOM MyRegisterClass(HINSTANCE hInstance);
BOOL InitInstance(HINSTANCE, int);
LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);
INT_PTR CALLBACK About(HWND, UINT, WPARAM, LPARAM);

int APIENTRY wWinMain(_In_ HINSTANCE hInstance,
                      _In_opt_ HINSTANCE hPrevInstance,
                      _In_ LPWSTR lpCmdLine,
                      _In_ int nCmdShow)
{
    // AllocConsole();

    // FILE *stream;
    // freopen_s(&stream, "CONOUT$", "w", stdout); // Redirect stdout to the console

    UNREFERENCED_PARAMETER(hPrevInstance);
    UNREFERENCED_PARAMETER(lpCmdLine);

    INITCOMMONCONTROLSEX icex;
    icex.dwSize = sizeof(INITCOMMONCONTROLSEX);
    icex.dwICC = ICC_TREEVIEW_CLASSES | ICC_LISTVIEW_CLASSES | ICC_STANDARD_CLASSES;
    InitCommonControlsEx(&icex);

    // TODO: Place code here.

    // Initialize global strings
    LoadStringW(hInstance, IDS_APP_TITLE, szTitle, MAX_LOADSTRING);
    LoadStringW(hInstance, IDC_TESTAPP, szWindowClass, MAX_LOADSTRING);
    MyRegisterClass(hInstance);

    // Perform application initialization:
    if (!InitInstance(hInstance, nCmdShow))
    {
        return FALSE;
    }

    HACCEL hAccelTable = LoadAccelerators(hInstance, MAKEINTRESOURCE(IDC_TESTAPP));

    MSG msg;

    // Main message loop:
    while (GetMessage(&msg, nullptr, 0, 0))
    {
        if (!TranslateAccelerator(msg.hwnd, hAccelTable, &msg))
        {
            TranslateMessage(&msg);
            DispatchMessage(&msg);
        }
    }

    return (int)msg.wParam;
}

//
//  FUNCTION: MyRegisterClass()
//
//  PURPOSE: Registers the window class.
//
ATOM MyRegisterClass(HINSTANCE hInstance)
{
    WNDCLASSEXW wcex;

    wcex.cbSize = sizeof(WNDCLASSEX);

    wcex.style = CS_HREDRAW | CS_VREDRAW;
    wcex.lpfnWndProc = WndProc;
    wcex.cbClsExtra = 0;
    wcex.cbWndExtra = 0;
    wcex.hInstance = hInstance;
    wcex.hIcon = LoadIcon(hInstance, MAKEINTRESOURCE(IDI_TESTAPP));
    wcex.hCursor = LoadCursor(nullptr, IDC_ARROW);
    wcex.hbrBackground = hBrush;
    wcex.lpszMenuName = MAKEINTRESOURCEW(IDC_TESTAPP);
    wcex.lpszClassName = szWindowClass;
    wcex.hIconSm = LoadIcon(wcex.hInstance, MAKEINTRESOURCE(IDI_SMALL));

    return RegisterClassExW(&wcex);
}

//
//   FUNCTION: InitInstance(HINSTANCE, int)
//
//   PURPOSE: Saves instance handle and creates main window
//
//   COMMENTS:
//
//        In this function, we save the instance handle in a global variable and
//        create and display the main program window.
//
BOOL InitInstance(HINSTANCE hInstance, int nCmdShow)
{
    hInst = hInstance; // Store instance handle in our global variable

    HWND hWnd = CreateWindowW(
        szWindowClass,
        szTitle,
        WS_OVERLAPPED | WS_CAPTION | WS_SYSMENU,
        CW_USEDEFAULT,
        CW_USEDEFAULT,
        WINDOW_WIDTH,
        WINDOW_HEIGHT,
        nullptr,
        nullptr,
        hInstance,
        nullptr);

    if (!hWnd)
    {
        return FALSE;
    }

    ShowWindow(hWnd, nCmdShow);
    UpdateWindow(hWnd);

    return TRUE;
}

//
//  FUNCTION: WndProc(HWND, UINT, WPARAM, LPARAM)
//
//  PURPOSE: Processes messages for the main window.
//
//  WM_COMMAND  - process the application menu
//  WM_PAINT    - Paint the main window
//  WM_DESTROY  - post a quit message and return
//
//
LRESULT CALLBACK WndProc(HWND hWnd, UINT message, WPARAM wParam, LPARAM lParam)
{
    switch (message)
    {
    case WM_CREATE:
    {
        hFont = CreateFont(18, 0, 0, 0, FW_NORMAL, FALSE, FALSE, FALSE, DEFAULT_CHARSET, OUT_DEFAULT_PRECIS, CLIP_DEFAULT_PRECIS, CLEARTYPE_QUALITY, VARIABLE_PITCH, L"Segoe UI");

        hFirstNameEdit = CreateEdit(hWnd, L"First Name", 10, 10, 200, 21);
        hLastNameEdit = CreateEdit(hWnd, L"Last Name", 10, 40, 200, 21);
        hAboutMeEdit = CreateEdit(hWnd, L"About Me", 10, 70, 200, 100, ES_MULTILINE | WS_VSCROLL | ES_AUTOVSCROLL);
        hOkButton = CreateButton(hWnd, IDI_OK, L"OK", 10, 180, 95, 30);
        hCancelButton = CreateButton(hWnd, IDI_CANCEL, L"Cancel", 115, 180, 95, 30);
        hTreeListView = CreateTreeListView(hWnd);

        hListView = CreateWindowEx(
            0,
            WC_LISTVIEW,
            L"List View",
            WS_VISIBLE | WS_CHILD | WS_BORDER | LVS_REPORT,
            10,
            220,
            410,
            200,
            hWnd,
            NULL,
            hInst,
            NULL);

        ListView_SetExtendedListViewStyle(hListView, LVS_EX_FULLROWSELECT | LVS_EX_DOUBLEBUFFER);

        const int columns = 4;
        const int rows = 50;

        LVCOLUMN lvColumn;
        lvColumn.mask = LVCF_TEXT | LVCF_WIDTH | LVCF_SUBITEM;
        lvColumn.cx = 95;

        for (int column = 0; column < columns; column++)
        {
            WCHAR text[20];
            swprintf(text, 20, L"Column %d", column + 1);
            lvColumn.pszText = text;
            lvColumn.iSubItem = column;
            ListView_InsertColumn(hListView, column, &lvColumn);
        }

        for (int row = 0; row < rows; row++)
        {
            for (int column = 0; column < columns; column++)
            {
                WCHAR text[20];
                swprintf(text, 20, L"R%d C%d", row + 1, column + 1);
                AddListViewItem(hListView, text, row, column);
            }
        }

        CreateCheckBox(hWnd, L"Check Box 1", 10, 420, 130, 30);
        CreateCheckBox(hWnd, L"Check Box 2", 10, 450, 130, 30);
        CreateCheckBox(hWnd, L"Check Box 3", 10, 480, 130, 30);

        CreateRadioButton(hWnd, L"Radio Button 1", 150, 420, 130, 30);
        CreateRadioButton(hWnd, L"Radio Button 2", 150, 450, 130, 30);
        CreateRadioButton(hWnd, L"Radio Button 3", 150, 480, 130, 30);

        CreateStaticLabel(hWnd, L"Static Label 1", 280, 426, 200, 30);

        hStatusBar = CreateWindowEx(
            0,
            STATUSCLASSNAME,
            NULL,
            WS_CHILD | WS_VISIBLE,
            0,
            0,
            0,
            0,
            hWnd,
            NULL,
            hInst,
            NULL);

        const int statusBarParts[4] = {135, 235, 335, 450};

        SendMessage(hStatusBar, SB_SETPARTS, sizeof(statusBarParts) / sizeof(int), (LPARAM)statusBarParts);
        SendMessage(hStatusBar, SB_SETTEXT, 1, (LPARAM)L" Status 1");
        SendMessage(hStatusBar, SB_SETTEXT, 2, (LPARAM)L" Status 2");
        SendMessage(hStatusBar, SB_SETTEXT, 3, (LPARAM)L" Status 3");

        SetWindowTheme(hListView, L"Explorer", NULL);
        SetWindowTheme(hTreeListView, L"Explorer", NULL);
    }

    break;

    case WM_COMMAND:
    {
        int wmId = LOWORD(wParam);
        // Parse the menu selections:
        switch (wmId)
        {
        case IDM_ABOUT:
            DialogBox(hInst, MAKEINTRESOURCE(IDD_ABOUTBOX), hWnd, About);
            break;
        case IDM_EXIT:
            DestroyWindow(hWnd);
            break;
        case IDI_OK:
            MessageBox(hWnd, L"OK button clicked", L"OK", MB_OK);
            break;
        case IDI_CANCEL:
            MessageBox(hWnd, L"Cancel button clicked", L"Cancel", MB_OK);
            break;
        default:
            return DefWindowProc(hWnd, message, wParam, lParam);
        }
    }
    break;

    case WM_PAINT:
    {
        PAINTSTRUCT ps;
        HDC hdc = BeginPaint(hWnd, &ps);

        HBRUSH hBrushOrange = CreateSolidBrush(RGB(241, 79, 33));
        HBRUSH hBrushGreen = CreateSolidBrush(RGB(127, 186, 0));
        HBRUSH hBrushBlue = CreateSolidBrush(RGB(0, 163, 238));
        HBRUSH hBrushYellow = CreateSolidBrush(RGB(254, 184, 0));

        HPEN hNullPen = (HPEN)GetStockObject(NULL_PEN);
        HPEN hOldPen = (HPEN)SelectObject(hdc, hNullPen);

        HBRUSH hOldBrush;

        hOldBrush = (HBRUSH)SelectObject(hdc, hBrushOrange);
        Rectangle(hdc, 375, 460, 400, 485);
        SelectObject(hdc, hOldBrush);

        hOldBrush = (HBRUSH)SelectObject(hdc, hBrushGreen);
        Rectangle(hdc, 400, 460, 425, 485);
        SelectObject(hdc, hOldBrush);

        hOldBrush = (HBRUSH)SelectObject(hdc, hBrushBlue);
        Rectangle(hdc, 375, 485, 400, 510);
        SelectObject(hdc, hOldBrush);

        hOldBrush = (HBRUSH)SelectObject(hdc, hBrushYellow);
        Rectangle(hdc, 400, 485, 425, 510);
        SelectObject(hdc, hOldBrush);

        DeleteObject(hBrushBlue);
        DeleteObject(hBrushOrange);
        DeleteObject(hBrushGreen);
        DeleteObject(hBrushYellow);

        EndPaint(hWnd, &ps);
        break;
    }
    break;

    case WM_DESTROY:
        PostQuitMessage(0);
        break;

    default:
        return DefWindowProc(hWnd, message, wParam, lParam);
    }
    return 0;
}

// Message handler for about box.
INT_PTR CALLBACK About(HWND hDlg, UINT message, WPARAM wParam, LPARAM lParam)
{
    UNREFERENCED_PARAMETER(lParam);
    switch (message)
    {
    case WM_INITDIALOG:
        return (INT_PTR)TRUE;

    case WM_COMMAND:
        if (LOWORD(wParam) == IDOK || LOWORD(wParam) == IDCANCEL)
        {
            EndDialog(hDlg, LOWORD(wParam));
            return (INT_PTR)TRUE;
        }
        break;
    }
    return (INT_PTR)FALSE;
}
