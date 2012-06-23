<?php

  class ArBaseModel extends CActiveRecord
  {
    protected $_defaultScopeDisabled = false; // Flag - whether defaultScope is disabled or not
    
    public $derivedColumns = array();

    public function behaviors()
    {
      return array(
          'EBeforeSave'=>'application.behaviors.EBeforeSaveBehavior',
          'EActiveRecordRelationBehavior'=>'application.behaviors.EActiveRecordRelationBehavior',
          'EZeroToNullFKsBeforeSaveBehavior'=>'application.behaviors.EZeroToNullFKsBeforeSaveBehavior',
          'MorrayBehavior'=>array('class'=>'application.behaviors.MorrayBehavior'),
      );
    }

    public function pivotModels() {
      $pms = array();
      foreach($this->metadata->relations as $relation)
      {
        if(get_class($relation) == 'CManyManyRelation')
          $pms[($relation->name)] = camelCase(substr($relation->foreignKey, 0, strpos($relation->foreignKey, '(')));
      }
      return $pms;
    }

    public static function label($n = 1) {
      return Yii::t('app', get_called_class() . '|' . get_called_class() . 's', $n);
    }

    public static function representingColumn() {
      $me = get_called_class();
      $me = new $me();
      foreach(array('lastname', 'title', 'name', 'address_1', 'email', 'body', 'file_name', 'id') as $attr) {
        if($me->hasAttribute($attr)) return $attr;
      }
      return null;
    }
    
  }

