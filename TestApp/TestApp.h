#pragma once

#include "resource.h"

HINSTANCE hInst;
HFONT hFont;
HBRUSH hBrush = CreateSolidBrush(RGB(240, 240, 240));

HWND CreateButton(HWND hWnd, int id, LPCWSTR text, int x, int y, int width, int height)
{
	HWND handle = CreateWindowEx(
			0,
			L"BUTTON",
			text,
			WS_TABSTOP | WS_VISIBLE | WS_CHILD | BS_DEFPUSHBUTTON,
			x,
			y,
			width,
			height,
			hWnd,
			(HMENU)id,
			hInst,
			NULL);

	SendMessage(handle, WM_SETFONT, (WPARAM)hFont, TRUE);

	return handle;
}

HWND CreateEdit(HWND hWnd, LPCWSTR text, int x, int y, int width, int height, DWORD style = ES_AUTOHSCROLL)
{
	HWND handle = CreateWindowEx(
			0,
			L"EDIT",
			L"",
			WS_TABSTOP | WS_VISIBLE | WS_CHILD | WS_BORDER | style,
			x,
			y,
			width,
			height,
			hWnd,
			NULL,
			hInst,
			NULL);

	SendMessage(handle, WM_SETFONT, (WPARAM)hFont, TRUE);

	return handle;
}

VOID AddListViewItem(HWND hListView, LPCWSTR text, int row, int column)
{
	LVITEM lvItem;
	lvItem.mask = LVIF_TEXT;
	lvItem.iItem = row;
	lvItem.iSubItem = column;
	lvItem.pszText = (LPWSTR)text;

	if (column == 0) // ✅ Only insert a new row for column 0
	{
		ListView_InsertItem(hListView, &lvItem);
	}
	else // ✅ For other columns, update the subitem text
	{
		ListView_SetItem(hListView, &lvItem);
	}
}

HWND CreateCheckBox(HWND hWnd, LPCWSTR text, int x, int y, int width, int height)
{
	HWND handle = CreateWindowEx(
			0,
			L"BUTTON",
			text,
			WS_TABSTOP | WS_VISIBLE | WS_CHILD | BS_AUTOCHECKBOX,
			x,
			y,
			width,
			height,
			hWnd,
			NULL,
			hInst,
			NULL);

	SendMessage(handle, WM_SETFONT, (WPARAM)hFont, TRUE);

	return handle;
}

HWND CreateRadioButton(HWND hWnd, LPCWSTR text, int x, int y, int width, int height)
{
	HWND handle = CreateWindowEx(
			0,
			L"BUTTON",
			text,
			WS_TABSTOP | WS_VISIBLE | WS_CHILD | BS_AUTORADIOBUTTON,
			x,
			y,
			width,
			height,
			hWnd,
			NULL,
			hInst,
			NULL);

	SendMessage(handle, WM_SETFONT, (WPARAM)hFont, TRUE);

	return handle;
}

HWND CreateTreeListView(HWND hWnd)
{
	HWND hTreeListView = CreateWindowEx(
			0,
			WC_TREEVIEW,
			L"Tree View",
			WS_VISIBLE | WS_CHILD | WS_BORDER | TVS_HASLINES | TVS_LINESATROOT | TVS_HASBUTTONS | TVS_SHOWSELALWAYS,
			220,
			10,
			200,
			200,
			hWnd,
			NULL,
			hInst,
			NULL);

	// populate the tree view
	TVINSERTSTRUCT tvInsert;
	tvInsert.hParent = NULL;
	tvInsert.hInsertAfter = TVI_ROOT;
	tvInsert.item.mask = TVIF_TEXT;
	tvInsert.item.pszText = (LPWSTR)L"Root";
	HTREEITEM hRoot = TreeView_InsertItem(hTreeListView, &tvInsert);

	tvInsert.hParent = hRoot;
	tvInsert.hInsertAfter = TVI_LAST;
	tvInsert.item.pszText = (LPWSTR)L"Child 1";
	HTREEITEM hChild1 = TreeView_InsertItem(hTreeListView, &tvInsert);

	tvInsert.hParent = hRoot;
	tvInsert.hInsertAfter = TVI_LAST;
	tvInsert.item.pszText = (LPWSTR)L"Child 2";
	HTREEITEM hChild2 = TreeView_InsertItem(hTreeListView, &tvInsert);

	tvInsert.hParent = hChild1;
	tvInsert.hInsertAfter = TVI_LAST;
	tvInsert.item.pszText = (LPWSTR)L"Child 1.1";
	HTREEITEM hChild11 = TreeView_InsertItem(hTreeListView, &tvInsert);

	tvInsert.hParent = hChild1;
	tvInsert.hInsertAfter = TVI_LAST;
	tvInsert.item.pszText = (LPWSTR)L"Child 1.2";
	HTREEITEM hChild12 = TreeView_InsertItem(hTreeListView, &tvInsert);

	tvInsert.hParent = hChild2;
	tvInsert.hInsertAfter = TVI_LAST;
	tvInsert.item.pszText = (LPWSTR)L"Child 2.1";
	HTREEITEM hChild21 = TreeView_InsertItem(hTreeListView, &tvInsert);

	tvInsert.hParent = hChild2;
	tvInsert.hInsertAfter = TVI_LAST;
	tvInsert.item.pszText = (LPWSTR)L"Child 2.2";
	HTREEITEM hChild22 = TreeView_InsertItem(hTreeListView, &tvInsert);

	tvInsert.hParent = hChild22;
	tvInsert.hInsertAfter = TVI_LAST;
	tvInsert.item.pszText = (LPWSTR)L"Grandchild 2.2.1";
	HTREEITEM hChild221 = TreeView_InsertItem(hTreeListView, &tvInsert);

	tvInsert.hParent = hChild22;
	tvInsert.hInsertAfter = TVI_LAST;
	tvInsert.item.pszText = (LPWSTR)L"Grandchild 2.2.2";
	HTREEITEM hChild222 = TreeView_InsertItem(hTreeListView, &tvInsert);

	tvInsert.hParent = hChild2;
	tvInsert.hInsertAfter = TVI_LAST;
	tvInsert.item.pszText = (LPWSTR)L"Child 2.3";
	HTREEITEM hChild23 = TreeView_InsertItem(hTreeListView, &tvInsert);

	return hTreeListView;
}

HWND CreateStaticLabel(HWND hWnd, LPCWSTR text, int x, int y, int width, int height)
{
	HWND handle = CreateWindowEx(
			0,
			L"STATIC",
			text,
			WS_VISIBLE | WS_CHILD,
			x,
			y,
			width,
			height,
			hWnd,
			NULL,
			hInst,
			NULL);

	SendMessage(handle, WM_SETFONT, (WPARAM)hFont, TRUE);

	return handle;
}
