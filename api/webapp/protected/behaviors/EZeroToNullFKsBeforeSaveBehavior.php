<?php
  class EZeroToNullFKsBeforeSaveBehavior extends CActiveRecordBehavior
  {
    public function beforeSave($event)
    {
      $relations = $this->owner->metadata->relations;
      foreach($relations as $relation)
      {
        if(get_class($relation) == 'CBelongsToRelation')
        {
          $fk = $relation->foreignKey;
          if($this->owner->$fk === 0)
            $this->owner->$fk = null;
        }
      }
      return parent::beforeSave($event);
    }
  }
