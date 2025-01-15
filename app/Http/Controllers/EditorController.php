<?php

namespace App\Http\Controllers;

use App\Models\Editor;
use App\Http\Requests\StoreEditorRequest;
use App\Http\Requests\UpdateEditorRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class EditorController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate incoming request
        $request->validate([
            'typeID' => 'required|exists:types,id',
            'userID' => 'required|exists:users,id',
            'labHeaderImg' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,svg',
            'imgInfo' => 'nullable|file|image|mimes:jpeg,png,jpg,gif,svg',
            'name' => 'required|string',
            'position' => 'required|string',
            'fontLayout' => 'nullable|string',
            'themeLayout' => 'nullable|string',
            'socialLinks' => 'nullable|json',
        ]);

        // Handle file uploads
        if ($request->has('labHeaderImg')){
            $labHeaderImg = $request->file('labHeaderImg');
            $labHeaderImgPath = rand() . time() . $labHeaderImg->getClientOriginalName();
            $labHeaderImg->move(public_path('images'), $labHeaderImgPath);
        }else{
            $labHeaderImgPath = null;
        }

        if ($request->has('imgInfo')){
            $imgInfo = $request->file('imgInfo');
            $imgInfoPath = rand() . time() . $imgInfo->getClientOriginalName();
            $imgInfo->move(public_path('images'), $imgInfoPath);
        }else{
            $imgInfoPath = null;
        }

        // Prepare data for database
        $editorData = $request->except('_token');
        $editorData['labHeaderImg'] = $labHeaderImgPath;
        $editorData['imgInfo'] = $imgInfoPath;

        // Save the editor data
        $editor = Editor::create($editorData);

        // Return response
        return response()->json([
            'success' => true,
            'message' => 'Editor created successfully!',
            'editor' => $editor,
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Editor $editor)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Editor $editor)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateEditorRequest $request, Editor $editor)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Editor $editor)
    {
        //
    }
}
