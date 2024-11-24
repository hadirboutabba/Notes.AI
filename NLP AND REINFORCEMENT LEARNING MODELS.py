import pandas as pd
from sklearn.feature_extraction.text import CountVectorizer
import re
import nltk
import numpy as np
import itertools
import random
from nltk.corpus import stopwords, words
from nltk.tokenize import word_tokenize
from sklearn.preprocessing import LabelEncoder
from keras.models import Sequential, Model
from keras.layers import Dense, Dropout, Input
from keras.utils import to_categorical
from tensorflow.keras.optimizers import Adam
from sklearn.model_selection import train_test_split

# Download necessary NLTK resources
nltk.download('stopwords')
nltk.download('punkt')
nltk.download('words')

# Initialize stopwords and English words
stop_words = set(stopwords.words("english"))
english_words = set(words.words())

# Preprocessing function for sentences
def preprocess_sentence(sentence):
    sentence = sentence.lower()
    sentence = re.sub(r'[^\w\s]', '', sentence)  # Remove punctuation/emojis
    sentence = re.sub(r'\d+', '', sentence)  # Remove numbers
    sentence = re.sub(r'(.)\1{2,}', r'\1', sentence)  # Replace repeated characters
    tokens = word_tokenize(sentence)
    tokens = [word for word in tokens if word in english_words and len(word) > 2]
    tokens = [word for word in tokens if word not in stop_words]
    return ' '.join(tokens)

# Load and preprocess data
def load_and_preprocess_data(filepath):
    df = pd.read_csv(filepath)
    data = df.loc[df['Sentiment'].isin(['positive', 'negative'])].copy()
    data.reset_index(drop=True, inplace=True)
    data['Sentiment'] = data['Sentiment'].replace({'positive': 0, 'negative': 1})
    data['ProcessedText'] = data['TweetText'].apply(preprocess_sentence)
    return data

# Vectorize text
def vectorize_text(data):
    vectorizer = CountVectorizer()
    one_hot_matrix = vectorizer.fit_transform(data['ProcessedText'])
    one_hot_matrix_df = pd.DataFrame(one_hot_matrix.toarray(), columns=vectorizer.get_feature_names_out())
    return one_hot_matrix_df, vectorizer

# Build an autoencoder model
def build_autoencoder(input_dim, encoding_dim):
    input_layer = Input(shape=(input_dim,))
    encoded = Dense(encoding_dim, activation='relu')(input_layer)
    decoded = Dense(input_dim, activation='sigmoid')(encoded)
    autoencoder = Model(input_layer, decoded)
    autoencoder.compile(optimizer='adam', loss='binary_crossentropy')
    encoder = Model(input_layer, encoded)
    return autoencoder, encoder

# Train autoencoder
def train_autoencoder(autoencoder, one_hot_matrix):
    autoencoder.fit(one_hot_matrix, one_hot_matrix, epochs=5, batch_size=16, shuffle=True, validation_split=0.2)

# Extract embeddings
def extract_embeddings(encoder, one_hot_matrix):
    return encoder.predict(one_hot_matrix)

# Q-Learning agent class
class QLearningAgent:
    def __init__(self, state_dim, action_space, learning_rate=0.01, discount_factor=0.9, exploration_rate=1.0, decay_rate=0.995):
        self.q_table = {}
        self.state_dim = state_dim
        self.action_space = action_space
        self.learning_rate = learning_rate
        self.discount_factor = discount_factor
        self.exploration_rate = exploration_rate
        self.decay_rate = decay_rate

    def get_q_value(self, state, action):
        return self.q_table.get((tuple(state), action), 0.0)

    def set_q_value(self, state, action, value):
        self.q_table[(tuple(state), action)] = value

    def choose_action(self, state):
        if np.random.rand() < self.exploration_rate:
            return random.choice(self.action_space)
        q_values = [self.get_q_value(state, action) for action in self.action_space]
        return self.action_space[np.argmax(q_values)]

    def update_q_table(self, state, action, reward, next_state):
        max_next_q = max([self.get_q_value(next_state, a) for a in self.action_space], default=0.0)
        current_q = self.get_q_value(state, action)
        new_q = current_q + self.learning_rate * (reward + self.discount_factor * max_next_q - current_q)
        self.set_q_value(state, action, new_q)

    def decay_exploration(self):
        self.exploration_rate *= self.decay_rate

# Calculate reward
def calculate_reward(selected_videos, visited_videos, completed_videos):
    reward = 0
    for video in selected_videos:
        if video in visited_videos:
            reward += 5
        if video in completed_videos:
            reward += 10
    if not any(video in visited_videos for video in selected_videos):
        reward -= 5
    return reward

# Train Q-learning agent
def train_q_learning_agent(embeddings, video_ids, episodes=10):
    action_space = list(itertools.combinations(video_ids, 5))
    agent = QLearningAgent(state_dim=embeddings.shape[1], action_space=action_space)
    for episode in range(episodes):
        state_idx = np.random.choice(len(embeddings))
        state = embeddings[state_idx]
        visited_videos = set(random.sample(video_ids, k=len(video_ids)//2))
        completed_videos = set(random.sample(list(visited_videos), k=len(video_ids)//4))
        for step in range(10):
            action = agent.choose_action(state)
            reward = calculate_reward(action, visited_videos, completed_videos)
            next_state_idx = np.random.choice(len(embeddings))
            next_state = embeddings[next_state_idx]
            agent.update_q_table(state, action, reward, next_state)
            state = next_state
        agent.decay_exploration()
    return agent

# Test Q-learning agent
def test_q_learning_agent(agent, embeddings, video_ids):
    test_state_idx = np.random.choice(len(embeddings))
    test_state = embeddings[test_state_idx]
    action = agent.choose_action(test_state)
    print("Recommended Videos:", action)

# Main function
if __name__ == "__main__":
    filepath = "full-corpus.csv"
    data = load_and_preprocess_data(filepath)
    one_hot_matrix_df, vectorizer = vectorize_text(data)
    one_hot_matrix = one_hot_matrix_df.to_numpy()

    input_dim = one_hot_matrix.shape[1]
    encoding_dim = 64
    autoencoder, encoder = build_autoencoder(input_dim, encoding_dim)
    train_autoencoder(autoencoder, one_hot_matrix)

    embeddings = extract_embeddings(encoder, one_hot_matrix)
    video_ids = list(range(1, 21))
    agent = train_q_learning_agent(embeddings, video_ids)
    test_q_learning_agent(agent, embeddings, video_ids)
