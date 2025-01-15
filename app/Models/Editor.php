<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Editor extends Model
{
    /** @use HasFactory<\Database\Factories\EditorFactory> */
    use HasFactory;

    protected $guarded = [];

    public function user()
    {
        return $this->belongsTo(User::class, 'userID');
    }

    public function type()
    {
        return $this->belongsTo(Type::class, 'typeID');
    }
}
