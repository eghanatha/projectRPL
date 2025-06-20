<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('list_lomba', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("kategori_id");
            $table->string("nama_lomba");
            $table->date("deadline");
            $table->string("deskripsi");
            $table->string("nama_kontak");
            $table->integer("kontak_whatsapp");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('list_lomba');
    }
};
