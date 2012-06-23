<?php

class m120623_201712_hate extends CDbMigration
{
	public function up()
  {
      $this->createTable('hate', array(
          'id'                => 'pk'
        , 'device_id'         => 'int NOT NULL'
        , 'lat'               => 'string NOT NULL'
        , 'long'              => 'string NOT NULL'
        , 'weight'            => 'int NULL'
        , 'url'               => 'string NULL'
        , 'desc'              => 'text NULL'
        , 'address'           => 'text NULL'
        , 'lud_dtm'           => 'datetime NULL'
        , 'crt_dtm'           => 'datetime NULL'
      ), 'ENGINE=InnoDB');

      $this->addForeignKey('fk_device_hate', 'hate', 'device_id', 'device', 'id', 'CASCADE', 'CASCADE');
	}

	public function down()
  {
    $this->dropForeignKey('fk_device_hate', 'hate');
    $this->dropTable('hate');
	}

	/*
	// Use safeUp/safeDown to do migration with transaction
	public function safeUp()
	{
	}

	public function safeDown()
	{
	}
	*/
}
