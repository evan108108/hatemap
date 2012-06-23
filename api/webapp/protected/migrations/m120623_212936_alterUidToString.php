<?php

class m120623_212936_alterUidToString extends CDbMigration
{
	public function up()
  {
    $this->alterColumn('device', 'uid', 'string NOT NULL');
	}

	public function down()
	{
	  $this->alterColumn('device', 'uid', 'int NOT NULL');
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
