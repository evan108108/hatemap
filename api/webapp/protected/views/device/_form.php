<?php $form=$this->beginWidget('bootstrap.widgets.BootActiveForm',array(
	'id'=>'device-form',
	'enableAjaxValidation'=>false,
)); ?>

	<p class="help-block">Fields with <span class="required">*</span> are required.</p>

	<?php echo $form->errorSummary($model); ?>

	<?php echo $form->textFieldRow($model,'uid',array('class'=>'span5','maxlength'=>255)); ?>

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
