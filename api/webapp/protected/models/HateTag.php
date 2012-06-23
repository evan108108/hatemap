<?php

/**
 * This is the model class for table "hate_tag".
 *
 * The followings are the available columns in table 'hate_tag':
 * @property integer $hate_id
 * @property integer $tag_id
 * @property string $lud_dtm
 * @property string $crt_dtm
 */
class HateTag extends ArBaseModel
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return HateTag the static model class
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
		return 'hate_tag';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('hate_id, tag_id', 'required'),
			array('hate_id, tag_id', 'numerical', 'integerOnly'=>true),
			array('lud_dtm, crt_dtm', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('hate_id, tag_id, lud_dtm, crt_dtm', 'safe', 'on'=>'search'),
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
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'hate_id' => 'Hate',
			'tag_id' => 'Tag',
			'lud_dtm' => 'Lud Dtm',
			'crt_dtm' => 'Crt Dtm',
		);
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

		$criteria->compare('hate_id',$this->hate_id);
		$criteria->compare('tag_id',$this->tag_id);
		$criteria->compare('lud_dtm',$this->lud_dtm,true);
		$criteria->compare('crt_dtm',$this->crt_dtm,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}
