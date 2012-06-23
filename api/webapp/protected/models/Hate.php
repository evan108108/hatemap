<?php

/**
 * This is the model class for table "hate".
 *
 * The followings are the available columns in table 'hate':
 * @property integer $id
 * @property integer $device_id
 * @property string $lat
 * @property string $long
 * @property integer $weight
 * @property string $url
 * @property string $desc
 * @property string $address
 * @property string $lud_dtm
 * @property string $crt_dtm
 *
 * The followings are the available model relations:
 * @property Device $device
 * @property Tag[] $tags
 */
class Hate extends ArBaseModel
{
  public $image;
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Hate the static model class
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
		return 'hate';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('device_id, lat, long', 'required'),
			array('device_id, weight', 'numerical', 'integerOnly'=>true),
			array('lat, long, url', 'length', 'max'=>255),
			array('desc, address, lud_dtm, crt_dtm', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
      array('id, device_id, lat, long, weight, url, desc, address, lud_dtm, crt_dtm', 'safe', 'on'=>'search'),
      array('image', 'file', 'types'=>'jpg, gif, png'),
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
			'device' => array(self::BELONGS_TO, 'Device', 'device_id'),
			'tags' => array(self::MANY_MANY, 'Tag', 'hate_tag(hate_id, tag_id)'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'device_id' => 'Device',
			'lat' => 'Lat',
			'long' => 'Long',
			'weight' => 'Weight',
			'url' => 'Url',
			'desc' => 'Desc',
			'address' => 'Address',
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

		$criteria->compare('id',$this->id);
		$criteria->compare('device_id',$this->device_id);
		$criteria->compare('lat',$this->lat,true);
		$criteria->compare('long',$this->long,true);
		$criteria->compare('weight',$this->weight);
		$criteria->compare('url',$this->url,true);
		$criteria->compare('desc',$this->desc,true);
		$criteria->compare('address',$this->address,true);
		$criteria->compare('lud_dtm',$this->lud_dtm,true);
		$criteria->compare('crt_dtm',$this->crt_dtm,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}
