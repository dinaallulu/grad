<?php

namespace App\Http\Controllers;

use App\Models\Type;
use App\Http\Requests\StoreTypeRequest;
use App\Http\Requests\UpdateTypeRequest;

class TypeController extends Controller
{
    public function fetchTemplates()
    {
        $types = Type::all();
        return response()->json($types);
    }
}
