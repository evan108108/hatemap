<?php $form=$this->beginWidget('bootstrap.widgets.BootActiveForm',array(
	'id'=>'hate-form',
	'enableAjaxValidation'=>false,
)); ?>

	<p class="help-block">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	<?php echo $form->textFieldRow($model,'device_id',array('class'=>'span5')); ?>

	<?php echo $form->textFieldRow($model,'lat',array('class'=>'span5','maxlength'=>255)); ?>

	<?php echo $form->textFieldRow($model,'long',array('class'=>'span5','maxlength'=>255)); ?>

	<?php echo $form->textFieldRow($model,'weight',array('class'=>'span5')); ?>

	<?php echo $form->textFieldRow($model,'url',array('class'=>'span5','maxlength'=>255)); ?>

	<?php echo $form->textAreaRow($model,'desc',array('rows'=>6, 'cols'=>50, 'class'=>'span8')); ?>

	<?php echo $form->textAreaRow($model,'address',array('rows'=>6, 'cols'=>50, 'class'=>'span8')); ?>

	<?php echo $form->textFieldRow($model,'lud_dtm',array('class'=>'span5')); ?>

	<?php echo $form->textFieldRow($model,'crt_dtm',array('class'=>'span5')); ?>

	<div class="form-actions">
		<?php $this->widget('bootstrap.widgets.BootButton', array(
			'buttonType'=>'submit',
			'type'=>'primary',
			'label'=>$model->isNewRecord ? 'Create' : 'Save',
		)); ?>
	</div>

<?php $this->endWidget(); ?>
