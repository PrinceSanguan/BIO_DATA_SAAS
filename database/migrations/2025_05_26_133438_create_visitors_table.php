<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('visitors', function (Blueprint $table) {
            $table->id();
            $table->string('ip_address');
            $table->string('user_agent')->nullable();
            $table->timestamp('visited_at');
            $table->timestamps();

            $table->unique(['ip_address', 'visited_at']);
            $table->index('visited_at');
        });
    }

    public function down()
    {
        Schema::dropIfExists('visitors');
    }
};
