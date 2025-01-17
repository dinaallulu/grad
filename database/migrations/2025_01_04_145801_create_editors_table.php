<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('editors', function (Blueprint $table) {
            $table->id();
            $table->foreignId('typeID')->constrained('types');
            $table->foreignId('userID')->constrained('users');
            $table->string('labHeaderImg')->nullable();
            $table->string('imgInfo')->nullable();
            $table->string('name');
            $table->string('position');
            $table->string('fontLayout')->nullable();
            $table->string('themeLayout')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('editors');
    }
};
