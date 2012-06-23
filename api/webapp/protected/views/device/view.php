<?php
$this->breadcrumbs=array(
	'Devices'=>array('index'),
	$model->id,
);

$this->menu=array(
	array('label'=>'List Device','url'=>array('index')),
	array('label'=>'Create Device','url'=>array('create')),
	array('label'=>'Update Device','url'=>array('update','id'=>$model->id)),
	array('label'=>'Delete Device','url'=>'#','linkOptions'=>array('submit'=>array('delete','id'=>$model->id),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage Device','url'=>array('admin')),
);
?>

<h1>View Device #<?php echo $model->id; ?></h1>

<?php $this->widget('bootstrap.widgets.BootDetailView',array(
	'data'=>$model,
	'attributes'=>array(
		'id',
		'uid',
		'lud_dtm',
		'crt_dtm',
	),
)); ?>
