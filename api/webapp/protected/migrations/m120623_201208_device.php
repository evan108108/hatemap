<?php

class m120623_201208_device extends CDbMigration
{
	public function up()
  {
      $this->createTable('device', array(
          'id'              => 'pk'
        , 'uid'             => 'int not null'
        , 'lud_dtm'         => 'datetime NULL'
        , 'crt_dtm'         => 'datetime NULL'
      ), 'ENGINE=InnoDB');
	}

	public function down()
	{
		$this->dropTable('device');
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
