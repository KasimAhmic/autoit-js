#pragma once

#include <memory>
#include <iostream>

#include "handles.h"
#include "logger.h"

const auto logger = new Logger("Main");

inline HWND CreateButton(HWND parentHandle,
                         const int id,
                         const LPCWSTR text,
                         const int x,
                         const int y,
                         const int width,
                         const int height) {
	HWND buttonHandle = CreateWindowEx(
		0,
		WC_BUTTON,
		text,
		WS_VISIBLE | WS_CHILD | BS_PUSHBUTTON,
		x,
		y,
		width,
		height,
		parentHandle,
		reinterpret_cast<HMENU>(id),
		instanceHandle,
		nullptr);

	SendMessage(buttonHandle, WM_SETFONT, reinterpret_cast<WPARAM>(fontHandle), TRUE);

	return buttonHandle;
}

inline HWND CreateEdit(HWND parentHandle,
                       const int id,
                       LPCWSTR text,
                       const int x,
                       const int y,
                       const int width,
                       const int height,
                       const DWORD style = ES_AUTOHSCROLL) {
	UNREFERENCED_PARAMETER(text);

	HWND handle = CreateWindowEx(
		0,
		WC_EDIT,
		L"",
		WS_TABSTOP | WS_VISIBLE | WS_CHILD | WS_BORDER | style,
		x,
		y,
		width,
		height,
		parentHandle,
		reinterpret_cast<HMENU>(id),
		instanceHandle,
		nullptr);

	SendMessage(handle, WM_SETFONT, reinterpret_cast<WPARAM>(fontHandle), TRUE);

	return handle;
}

inline VOID AddListViewItem(HWND treeListViewHandle, LPWSTR text, const int row, const int column) {
	LVITEMW lvItem;
	lvItem.mask = LVIF_TEXT;
	lvItem.iItem = row;
	lvItem.iSubItem = column;
	lvItem.pszText = text;

	if (column == 0) // Only insert a new row for column 0
	{
		ListView_InsertItem(treeListViewHandle, &lvItem);
	} else // For other columns, update the subitem text
	{
		ListView_SetItem(treeListViewHandle, &lvItem);
	}
}

inline HWND CreateCheckBox(HWND parentHandle,
                           const LPCWSTR text,
                           const int x,
                           const int y,
                           const int width,
                           const int height) {
	HWND checkBoxHandle = CreateWindowEx(
		0,
		WC_BUTTON,
		text,
		WS_TABSTOP | WS_VISIBLE | WS_CHILD | BS_AUTOCHECKBOX,
		x,
		y,
		width,
		height,
		parentHandle,
		nullptr,
		instanceHandle,
		nullptr);

	SendMessage(checkBoxHandle, WM_SETFONT, reinterpret_cast<WPARAM>(fontHandle), TRUE);

	return checkBoxHandle;
}

inline HWND CreateRadioButton(HWND hWnd,
                              const LPCWSTR text,
                              const int x,
                              const int y,
                              const int width,
                              const int height) {
	HWND radioHandle = CreateWindowEx(
		0,
		WC_BUTTON,
		text,
		WS_TABSTOP | WS_VISIBLE | WS_CHILD | BS_AUTORADIOBUTTON,
		x,
		y,
		width,
		height,
		hWnd,
		nullptr,
		instanceHandle,
		nullptr);

	SendMessage(radioHandle, WM_SETFONT, reinterpret_cast<WPARAM>(fontHandle), TRUE);

	return radioHandle;
}

inline HWND CreateTreeListView(HWND hWnd,
                               const int id,
                               const int x,
                               const int y,
                               const int width,
                               const int height) {
	HWND handle = CreateWindowEx(
		0,
		WC_TREEVIEW,
		L"Tree View",
		WS_VISIBLE | WS_CHILD | WS_BORDER | TVS_HASLINES | TVS_LINESATROOT | TVS_HASBUTTONS | TVS_SHOWSELALWAYS,
		x,
		y,
		width,
		height,
		hWnd,
		reinterpret_cast<HMENU>(id),
		instanceHandle,
		nullptr);

	TVINSERTSTRUCT treeViewInsert;

	treeViewInsert.hParent = nullptr;
	treeViewInsert.hInsertAfter = TVI_ROOT;
	treeViewInsert.item.mask = TVIF_TEXT;
	treeViewInsert.item.pszText = const_cast<LPWSTR>(L"Root");
	auto rootHandle = TreeView_InsertItem(handle, &treeViewInsert);

	treeViewInsert.hParent = rootHandle;
	treeViewInsert.item.pszText = const_cast<LPWSTR>(L"Child 1");
	auto childOneHandle = TreeView_InsertItem(handle, &treeViewInsert);

	treeViewInsert.hParent = rootHandle;
	treeViewInsert.item.pszText = const_cast<LPWSTR>(L"Child 2");
	auto childTwoHandle = TreeView_InsertItem(handle, &treeViewInsert);

	treeViewInsert.hParent = childOneHandle;
	treeViewInsert.item.pszText = const_cast<LPWSTR>(L"Child 1.1");
	TreeView_InsertItem(handle, &treeViewInsert);

	treeViewInsert.hParent = childOneHandle;
	treeViewInsert.item.pszText = const_cast<LPWSTR>(L"Child 1.2");
	TreeView_InsertItem(handle, &treeViewInsert);

	treeViewInsert.hParent = childTwoHandle;
	treeViewInsert.item.pszText = const_cast<LPWSTR>(L"Child 2.1");
	TreeView_InsertItem(handle, &treeViewInsert);

	treeViewInsert.hParent = childTwoHandle;
	treeViewInsert.item.pszText = const_cast<LPWSTR>(L"Child 2.2");
	auto childTwoDotTwoHandle = TreeView_InsertItem(handle, &treeViewInsert);

	treeViewInsert.hParent = childTwoDotTwoHandle;
	treeViewInsert.item.pszText = const_cast<LPWSTR>(L"Grandchild 2.2.1");
	TreeView_InsertItem(handle, &treeViewInsert);

	treeViewInsert.hParent = childTwoDotTwoHandle;
	treeViewInsert.item.pszText = const_cast<LPWSTR>(L"Grandchild 2.2.2");
	TreeView_InsertItem(handle, &treeViewInsert);

	treeViewInsert.hParent = childTwoHandle;
	treeViewInsert.item.pszText = const_cast<LPWSTR>(L"Child 2.3");
	TreeView_InsertItem(handle, &treeViewInsert);

	return handle;
}

inline HWND CreateStaticText(HWND hWnd,
                             const LPCWSTR text,
                             const int x,
                             const int y,
                             const int width,
                             const int height) {
	HWND staticTextHandle = CreateWindowEx(
		0,
		WC_STATIC,
		text,
		WS_VISIBLE | WS_CHILD,
		x,
		y,
		width,
		height,
		hWnd,
		nullptr,
		instanceHandle,
		nullptr);

	SendMessage(staticTextHandle, WM_SETFONT, reinterpret_cast<WPARAM>(fontHandle), TRUE);

	return staticTextHandle;
}

inline std::string DecodeError(DWORD errorCode) {
	const auto outputBuffer = std::make_unique<wchar_t[]>(256);

	FormatMessage(
		FORMAT_MESSAGE_FROM_SYSTEM | FORMAT_MESSAGE_IGNORE_INSERTS | FORMAT_MESSAGE_MAX_WIDTH_MASK,
		nullptr,
		errorCode,
		MAKELANGID(LANG_NEUTRAL, SUBLANG_DEFAULT),
		outputBuffer.get(),
		256,
		nullptr);

	return {outputBuffer.get(), outputBuffer.get() + wcslen(outputBuffer.get())};
}

inline RECT GetRectRelativeToParent(HWND control, HWND parent) {
	RECT rect;

	GetWindowRect(control, &rect);
	ScreenToClient(parent, reinterpret_cast<LPPOINT>(&rect.left));
	ScreenToClient(parent, reinterpret_cast<LPPOINT>(&rect.right));

	return rect;
}

inline VOID SetTheme(HWND handle) {
	if (const HRESULT result = SetWindowTheme(handle, L"Explorer", nullptr); result != S_OK) {
		logger->warn("Failed to set theme on window. Reason: " + result);
	}
}
