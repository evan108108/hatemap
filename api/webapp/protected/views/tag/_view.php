<div class="view">

	<b><?php echo CHtml::encode($data->getAttributeLabel('id')); ?>:</b>
	<?php echo CHtml::link(CHtml::encode($data->id),array('view','id'=>$data->id)); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('name')); ?>:</b>
	<?php echo CHtml::encode($data->name); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('lud_dtm')); ?>:</b>
	<?php echo CHtml::encode($data->lud_dtm); ?>
	<br />

	<b><?php echo CHtml::encode($data->getAttributeLabel('crt_dtm')); ?>:</b>
	<?php echo CHtml::encode($data->crt_dtm); ?>
	<br />


</div>