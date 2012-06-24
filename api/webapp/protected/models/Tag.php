<?php

/**
 * This is the model class for table "tag".
 *
 * The followings are the available columns in table 'tag':
 * @property integer $id
 * @property string $name
 * @property string $lud_dtm
 * @property string $crt_dtm
 *
 * The followings are the available model relations:
 * @property Hate[] $hates
 */
class Tag extends ArBaseModel
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Tag the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'tag';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('name', 'required'),
			array('name', 'length', 'max'=>255),
			array('lud_dtm, crt_dtm', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, name, lud_dtm, crt_dtm', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
			'hates' => array(self::MANY_MANY, 'Hate', 'hate_tag(tag_id, hate_id)'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'name' => 'Name',
			'lud_dtm' => 'Lud Dtm',
			'crt_dtm' => 'Crt Dtm',
		);
	}
  
  public static function setTag($tag)
  {
    $mtag = new Tag();
    if(is_array($tag))
    {
      if(!$tag['id'])
      {
        $mtag->attributes = $tag;
        if($mtag->save(false)) 
          $mtag->refresh();
      }
    }
    else
    {
      $mtag->name = $tag;
      if($mtag->save(false)) 
          $mtag->refresh();
    }
    return $tag;
  }

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('id',$this->id);
		$criteria->compare('name',$this->name,true);
		$criteria->compare('lud_dtm',$this->lud_dtm,true);
		$criteria->compare('crt_dtm',$this->crt_dtm,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}
