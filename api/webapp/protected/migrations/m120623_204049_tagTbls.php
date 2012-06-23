<?php

class m120623_204049_tagTbls extends CDbMigration
{
	public function up()
  {
      $this->createTable('tag', array(
          'id'                => 'pk'
        , 'name'              => 'string not null'
        , 'lud_dtm'           => 'datetime NULL'
        , 'crt_dtm'           => 'datetime NULL'
      ), 'ENGINE=InnoDB');

      $this->createTable('hate_tag', array(
          'hate_id'             => 'int NOT NULL'
        , 'tag_id'              => 'int NOT NULL'
        , 'lud_dtm'             => 'datetime NULL'
        , 'crt_dtm'             => 'datetime NULL'
        , 'primary key (hate_id, tag_id)'
      ), 'ENGINE=InnoDB');

      $this->addForeignKey('fk_hate_tag_hate', 'hate_tag', 'hate_id', 'hate', 'id', 'CASCADE', 'CASCADE');
      $this->addForeignKey('fk_hate_tag_tag', 'hate_tag', 'tag_id', 'tag', 'id', 'CASCADE', 'CASCADE');
	}

	public function down()
	{
		$this->dropForeignKey('fk_hate_tag_hate', 'hate_tag');
    $this->dropForeignKey('fk_hate_tag_tag', 'hate_tag');

    $this->dropTable('tag');
    $this->dropTable('hate_tag');
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
