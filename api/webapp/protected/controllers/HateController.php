<?php

class HateController extends ERestController
{
	/**
	 * @var string the default layout for the views. Defaults to '//layouts/column2', meaning
	 * using two-column layout. See 'protected/views/layouts/column2.php'.
	 */
	public $layout='//layouts/column2';

	/**
	 * @return array action filters
	 */
	public function _filters()
	{
		return array(
			'accessControl', // perform access control for CRUD operations
		);
	}

	/**
	 * Specifies the access control rules.
	 * This method is used by the 'accessControl' filter.
	 * @return array access control rules
	 */
	public function _accessRules()
	{
		return array(
			array('allow',  // allow all users to perform 'index' and 'view' actions
				'actions'=>array('index','view'),
				'users'=>array('*'),
			),
			array('allow', // allow authenticated user to perform 'create' and 'update' actions
				'actions'=>array('create','update'),
				'users'=>array('@'),
			),
			array('allow', // allow admin user to perform 'admin' and 'delete' actions
				'actions'=>array('admin','delete'),
				'users'=>array('admin'),
			),
			array('deny',  // deny all users
				'users'=>array('*'),
			),
		);
	}
  protected function getFileExt($type)
  {
    $ext = explode('/', $type);
    return $ext[(count($ext)-1)];
  }

  public function doCustomRestGetMe($var=null)
  {
     $this->renderJson(array('success'=>true, 'message'=>'Records Retrieved Successfully', 'data'=>$this->device->hates));
    //$this->renderJson(array('success'=>true, 'message'=>'Image Uploaded', 'data'=>array('url'=>Yii::app()->getBaseUrl(true) . "/images/hates/" . $filename)));
  }

  public function doCustomRestPostImage($var=null)
  {
    //throw new CHttpException(200, 'Error: Could not upload image'); 
    //Directory where uploaded images are saved
    $dirname = str_replace('/protected', '', Yii::app()->getBasePath()) . '/images/hates'; 
    // If uploading file
    if ($_FILES) {    
      $filename = $this->uid . "_" . md5(time().rand()) . '.' . $this->getFileExt($_FILES["file"]["type"]);
      //print_r($_FILES);    
      @mkdir ($dirname, 0777, true);
      move_uploaded_file($_FILES["file"]["tmp_name"], $dirname."/".$filename);
      $this->renderJson(array('success'=>true, 'message'=>'Image Uploaded', 'data'=>array('url'=>Yii::app()->getBaseUrl(true) . "/images/hates/" . $filename)));
    } 
    else
     throw new CHttpException(200, 'Error: Could not upload image'); 
  }

   /* This is broken out as a sperate method from actionResUpdate 
   * To allow for easy overriding in the controller
   * and to allow for easy unit testing
    */ 
  /*
  public function doRestUpdate($id, $data)
  {    
    if(is_array($data['tags']))
    {
      $tags = array();
      foreach($data['tags'] as $tag)
      {
        $tags = Tag::setTag($tag);
      }
      $data['tags'] = $tags;
    }
    $model = $this->saveModel($this->loadModel($id), $data);
    $this->renderJson(array('success'=>true, 'message'=>'Record Updated', 'data'=>array('id'=>$id)));
  }
   */
  /**
   * This is broken out as a sperate method from actionRestCreate 
   * To allow for easy overriding in the controller
   * and to alow for easy unit testing
   */ 
  public function doRestCreate($data)
  {
    //error_log(CJSON::encode($data), 0); 
    $data['device_id'] = $this->device->id;
    $model = $this->getModel();
    
    if((empty($data['lat']) || empty($data['long'])) && !empty($data['address']))
    {
      $geo = CJSON::decode(file_get_contents('http://maps.googleapis.com/maps/api/geocode/json?address=' . urlencode($data['address']) . '&sensor=false'));
      if(!empty($geo['results'][0]['geometry']['location']))
      {
        $data['lat'] = $geo['results'][0]['geometry']['location']['lat'];
        $data['long'] = $geo['results'][0]['geometry']['location']['lng'];
      }
    }
     
    $ids = $this->saveModel($model, $data);

    $this->renderJson(array('success'=>true, 'message'=>'Record(s) Created', 'data'=>array('id'=>$ids)));
  }

  public function doRestUpdate($id, $data)
  {   
    $data['device_id'] = $this->device->id; 
    $model = $this->saveModel($this->loadModel($id), $data);
    $this->renderJson(array('success'=>true, 'message'=>'Record Updated', 'data'=>array('id'=>$id)));
  }

	/**
	 * Displays a particular model.
	 * @param integer $id the ID of the model to be displayed
	 */
	public function actionView($id)
  {
		$this->render('view',array(
			'model'=>$this->loadModel($id),
		));
  }

	/**
	 * Creates a new model.
	 * If creation is successful, the browser will be redirected to the 'view' page.
	 */
	public function actionCreate()
	{
		$model=new Hate;

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Hate']))
		{
			$model->attributes=$_POST['Hate'];
			if($model->save())
				$this->redirect(array('view','id'=>$model->id));
		}

		$this->render('create',array(
			'model'=>$model,
		));
	}

	/**
	 * Updates a particular model.
	 * If update is successful, the browser will be redirected to the 'view' page.
	 * @param integer $id the ID of the model to be updated
	 */
	public function actionUpdate($id)
	{
		$model=$this->loadModel($id);

		// Uncomment the following line if AJAX validation is needed
		// $this->performAjaxValidation($model);

		if(isset($_POST['Hate']))
		{
			$model->attributes=$_POST['Hate'];
			if($model->save())
				$this->redirect(array('view','id'=>$model->id));
		}

		$this->render('update',array(
			'model'=>$model,
		));
	}

	/**
	 * Deletes a particular model.
	 * If deletion is successful, the browser will be redirected to the 'admin' page.
	 * @param integer $id the ID of the model to be deleted
	 */
	public function actionDelete($id)
	{
		if(Yii::app()->request->isPostRequest)
		{
			// we only allow deletion via POST request
			$this->loadModel($id)->delete();

			// if AJAX request (triggered by deletion via admin grid view), we should not redirect the browser
			if(!isset($_GET['ajax']))
				$this->redirect(isset($_POST['returnUrl']) ? $_POST['returnUrl'] : array('admin'));
		}
		else
			throw new CHttpException(400,'Invalid request. Please do not repeat this request again.');
	}

	/**
	 * Lists all models.
	 */
	public function actionIndex()
	{
		$dataProvider=new CActiveDataProvider('Hate');
		$this->render('index',array(
			'dataProvider'=>$dataProvider,
		));
  }


	/**
	 * Manages all models.
	 */
	public function actionAdmin()
	{
		$model=new Hate('search');
		$model->unsetAttributes();  // clear any default values
		if(isset($_GET['Hate']))
			$model->attributes=$_GET['Hate'];

		$this->render('admin',array(
			'model'=>$model,
		));
	}

	/**
	 * Returns the data model based on the primary key given in the GET variable.
	 * If the data model is not found, an HTTP exception will be raised.
	 * @param integer the ID of the model to be loaded
	 */
	public function loadModel($id)
	{
		$model=Hate::model()->findByPk($id);
		if($model===null)
			throw new CHttpException(404,'The requested page does not exist.');
		return $model;
	}

	/**
	 * Performs the AJAX validation.
	 * @param CModel the model to be validated
	 */
	protected function performAjaxValidation($model)
	{
		if(isset($_POST['ajax']) && $_POST['ajax']==='hate-form')
		{
			echo CActiveForm::validate($model);
			Yii::app()->end();
		}
	}
}
