<?php

/**
 * This is the model class for table "device".
 *
 * The followings are the available columns in table 'device':
 * @property integer $id
 * @property integer $uid
 * @property string $lud_dtm
 * @property string $crt_dtm
 *
 * The followings are the available model relations:
 * @property Hate[] $hates
 */
class Device extends ArBaseModel
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return Device the static model class
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
		return 'device';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('uid', 'required'),
			//array('uid', 'numerical', 'integerOnly'=>true),
			array('lud_dtm, crt_dtm', 'safe'),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('id, uid, lud_dtm, crt_dtm', 'safe', 'on'=>'search'),
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
			'hates' => array(self::HAS_MANY, 'Hate', 'device_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'id' => 'ID',
			'uid' => 'Uid',
			'lud_dtm' => 'Lud Dtm',
			'crt_dtm' => 'Crt Dtm',
		);
  }

  public static function setDevice($uid)
  {
    $device = Device::model()->findByAttributes(array('uid'=>$uid));
    if(!is_null($device))
      return $device;
    else
    {
      $device = new Device();
      $device->uid = $uid;
      $device->save(false);
    }
    return $device;
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
		$criteria->compare('uid',$this->uid);
		$criteria->compare('lud_dtm',$this->lud_dtm,true);
		$criteria->compare('crt_dtm',$this->crt_dtm,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}
