<?php
$this->breadcrumbs=array(
	'Hates'=>array('index'),
	$model->id=>array('view','id'=>$model->id),
	'Update',
);

$this->menu=array(
	array('label'=>'List Hate','url'=>array('index')),
	array('label'=>'Create Hate','url'=>array('create')),
	array('label'=>'View Hate','url'=>array('view','id'=>$model->id)),
	array('label'=>'Manage Hate','url'=>array('admin')),
);
?>

<h1>Update Hate <?php echo $model->id; ?></h1>

<?php echo $this->renderPartial('_form',array('model'=>$model)); ?>