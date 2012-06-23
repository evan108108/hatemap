<?php
$this->breadcrumbs=array(
	'Hates'=>array('index'),
	$model->id,
);

$this->menu=array(
	array('label'=>'List Hate','url'=>array('index')),
	array('label'=>'Create Hate','url'=>array('create')),
	array('label'=>'Update Hate','url'=>array('update','id'=>$model->id)),
	array('label'=>'Delete Hate','url'=>'#','linkOptions'=>array('submit'=>array('delete','id'=>$model->id),'confirm'=>'Are you sure you want to delete this item?')),
	array('label'=>'Manage Hate','url'=>array('admin')),
);
?>

<h1>View Hate #<?php echo $model->id; ?></h1>

<?php $this->widget('bootstrap.widgets.BootDetailView',array(
	'data'=>$model,
	'attributes'=>array(
		'id',
		'device_id',
		'lat',
		'long',
		'weight',
		'url',
		'desc',
		'address',
		'lud_dtm',
		'crt_dtm',
	),
)); ?>
