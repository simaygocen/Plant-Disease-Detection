import numpy as np
from PIL import Image
from io import BytesIO
import tensorflow as tf
from flask import jsonify, request

MODEL = tf.keras.models.load_model("C:\\Users\\Monster\\Desktop\\ReactNativeApp\\model_96_55.h5")
#MODEL = tf.keras.models.load_model("C:\\Users\\elif_\\OneDrive\\Belgeler\\model_96_55.h5")
CLASS_NAMES = ['Black_Rot', 'Cedar_Rust', 'Healthy', 'Scab']

def read_file_as_image(data) -> np.ndarray:
    image = np.array(Image.open(BytesIO(data)).resize((256, 256)))  # Görüntüyü ölçeklendir
    return image

def predict():
    try:
        file = request.files['file']
        image = read_file_as_image(file.read())
        img_batch = np.expand_dims(image, 0)
        predictions = MODEL.predict(img_batch)
        predicted_class = CLASS_NAMES[np.argmax(predictions[0])]
        confidence = float(np.max(predictions[0]))
        return jsonify({
            'class': predicted_class,
            'confidence': confidence
        })
    except Exception as e:
        return jsonify({'error': str(e)})
