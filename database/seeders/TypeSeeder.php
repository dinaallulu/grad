<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('types')->truncate();
        DB::table('types')->insertOrIgnore([
            [
                'id' => 1,
                'name' => 'Personal website',
                'type' => 'image',
                'image' =>
                '/assets/personalWebsiteTemplate.png',
                // 'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 2,
                'name' => 'Group lab website',
                'type' => 'image',
                'image' =>
                '/assets/groupLabTemplateImg.png',
                // 'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'id' => 3,
                'name' => 'Conference website',
                'type' => 'image',
                'image' =>
                '/assets/ConfrenceTemplateWebsite.png',
                // 'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
